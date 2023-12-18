import { filter } from 'lodash';

import { useEffect, useState } from 'react';
// material
import {
    Card,
    Container,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';

import SearchNotFound from '../components/SearchNotFound';
import { OrderListHead } from '../sections/@dashboard/order';
// mock
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchStaffs } from 'src/redux/actions/order_actions';
import { fetchRolesAndPermissions } from 'src/redux/actions/role_and_permissions_actions';
import Loading from 'src/share/Loading/Loading';
import PermissionDenied from 'src/share/permission_denied/PermissionDenied';
import USERLIST from '../_mock/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'order_number', label: 'Order Number', alignRight: false },
    { id: 'customer_id', label: 'Customer Name', alignRight: false },
    { id: 'customer_email', label: 'Customer Email', alignRight: false },
    { id: 'payment_option', label: 'Payment Option', alignRight: false },
    { id: 'grand_total', label: 'Grand Total', },
    { id: 'created_at', label: 'Created At', },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function User() {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const staffs = useSelector((state) => state.staff.staff);
    const cus_orders = useSelector((state) => state.order.order);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    const filteredUsers = applySortFilter(cus_orders, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;


    const isLoading = useSelector((state) => state.staff.isLoading);

    const dispatch = useDispatch();

    const staffLoading = useSelector((state) => state.user.isLoading);
    const staff = useSelector((state) => state.user.user);

    const roleAndPermissions = useSelector((state) => state.roleAndPermissions.roleAndPermission);
    const roleAndPermissionLoading = useSelector((state) => state.roleAndPermissions.loading);

    const [hasUserCreatePermission, setHasUserCreatePermission] = useState(false);
    const [hasUserEditPermission, setHasUserEditPermission] = useState(false);
    const [hasUserListPermission, setHasUserListPermission] = useState(false);
    const [hasUserDeletePermission, setHasUserDeletePermission] = useState(false);

    const setUserPermission = (permissions) => {
        for (let i = 0; i < permissions.length; i++) {
            if (permissions[i].name == "user-create") {
                setHasUserCreatePermission(true)
            }
            if (permissions[i].name == "user-edit") {
                setHasUserEditPermission(true)
            }
            if (permissions[i].name == "user-list") {
                setHasUserListPermission(true)
            }
            if (permissions[i].name == "user-delete") {
                setHasUserDeletePermission(true)
            }
        }
    }

    useEffect(() => {
        dispatch(fetchStaffs())
        dispatch(fetchOrders())
        dispatch(fetchRolesAndPermissions())
        if (!staffLoading) {
            setUserPermission(staff.permissions)
        }
    }, [staff && cus_orders && staff.permissions])

    return (
        <Page title="User">
            <Container>
                {
                    staffLoading || roleAndPermissionLoading ?
                        <Loading />
                        :
                        <>
                            {
                                !hasUserListPermission ?
                                    <PermissionDenied />
                                    :
                                    <>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                            <Typography variant="h4" gutterBottom>
                                                Orders
                                            </Typography>
                                        </Stack>

                                        <Card>
                                            {/* <OrderListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

                                            <Scrollbar>
                                                <TableContainer sx={{ minWidth: 800 }}>
                                                    <Table>
                                                        <OrderListHead
                                                            order={order}
                                                            orderBy={orderBy}
                                                            headLabel={TABLE_HEAD}
                                                            rowCount={cus_orders.length}
                                                            numSelected={selected.length}
                                                            onRequestSort={handleRequestSort}
                                                            onSelectAllClick={handleSelectAllClick}
                                                        />
                                                        <TableBody>
                                                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                                // const { id, name, role, email, avatarUrl, roles } = row;
                                                                const { id, order_number, customer_name, customer_email, payment_option, grand_total, created_at } = row;
                                                                const isItemSelected = selected.indexOf(order_number) !== -1;

                                                                return (
                                                                    <TableRow
                                                                        hover
                                                                        key={id}
                                                                        tabIndex={-1}

                                                                    >
                                                                        <TableCell padding="checkbox" />
                                                                        <TableCell component="th" scope="row" padding="none">{order_number}</TableCell>
                                                                        <TableCell align="left">{customer_name}</TableCell>
                                                                        <TableCell align="left">{customer_email}</TableCell>
                                                                        <TableCell align="left">{payment_option}</TableCell>
                                                                        <TableCell align="left">{grand_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MMK</TableCell>
                                                                        <TableCell align="left">{created_at}</TableCell>
                                                                    </TableRow>
                                                                );
                                                            })}
                                                            {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                    <TableCell colSpan={6} />
                                                                </TableRow>
                                                            )}
                                                        </TableBody>

                                                        {isUserNotFound && (
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                                        <SearchNotFound searchQuery={filterName} />
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        )}
                                                    </Table>
                                                </TableContainer>
                                            </Scrollbar>

                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                component="div"
                                                count={cus_orders.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                        </Card>
                                    </>

                            }
                        </>
                }
            </Container>
        </Page>
    );
}
