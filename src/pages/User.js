import { filter } from 'lodash';

import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  IconButton
} from '@mui/material';
// components
import { Icon } from '@iconify/react';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaffs } from 'src/redux/actions/staff_actions';
import Loading from 'src/share/Loading/Loading';
import PermissionDenied from 'src/share/permission_denied/PermissionDenied';
import UserDeleteDialog from './user_components/UserDeleteDialog';
import { fetchRolesAndPermissions } from 'src/redux/actions/role_and_permissions_actions';
import UserEditDialog from './user_components/UserEditDialog';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'action', label: 'Action',},
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

  const filteredUsers = applySortFilter(staffs, getComparator(order, orderBy), filterName);

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
    dispatch(fetchRolesAndPermissions())
    if (!staffLoading) {
      setUserPermission(staff.permissions)
    }
  }, [staff && staff.permissions])

  return (
    <Page title="User">
      <Container>
        {
          staffLoading || roleAndPermissionLoading?
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
                        Staffs
                      </Typography>
                      <Button variant="contained" component={RouterLink} to="/dashboard/addnewusers" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Staff
                      </Button>
                    </Stack>

                    <Card>
                      <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                      <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                          <Table>
                            <UserListHead
                              order={order}
                              orderBy={orderBy}
                              headLabel={TABLE_HEAD}
                              rowCount={staffs.length}
                              numSelected={selected.length}
                              onRequestSort={handleRequestSort}
                              onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const { id, name, role, email, avatarUrl, roles } = row;
                                const isItemSelected = selected.indexOf(name) !== -1;

                                return (
                                  <TableRow
                                    hover
                                    key={id}
                                    tabIndex={-1}

                                  >
                                    <TableCell padding="checkbox" />


                                    <TableCell component="th" scope="row" padding="none">
                                      <Stack direction="row" alignItems="center" spacing={2}>
                                        <Avatar alt={name} src={avatarUrl} />
                                        <Typography variant="subtitle2" noWrap>
                                          {name}
                                        </Typography>
                                      </Stack>
                                    </TableCell>
                                    <TableCell align="left">{email}</TableCell>
                                    <TableCell align="left">{roles.length === 0 ? "NA" : roles[0].name}</TableCell>
                                    <TableCell align="center">
                                     {
                                      name.toLowerCase() == "super admin" || name.toLowerCase() == "admin" ?
                                      "NA : Denied By Dev"
                                      :
                                      <Box display="flex" justifyContent="center" alignItems="center">
                                       {
                                        hasUserDeletePermission ?
                                          <UserDeleteDialog userId={id}/>
                                          :
                                          ""
                                      }

                                      {
                                        hasUserEditPermission ?
                                          <UserEditDialog userName={name} email={email} userRole={roles.length == 0 ? "NA" : roles[0].name} userRoles={roleAndPermissions} userId={id}/>
                                          :
                                          ""
                                      }
                                      </Box>
                                     }

                                    </TableCell>

                                    {/* <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell> */}
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
                        count={staffs.length}
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
