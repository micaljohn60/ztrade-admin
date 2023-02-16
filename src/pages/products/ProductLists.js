import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Box,
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
  Input,
  Chip,
  TextField,
  LinearProgress,
} from '@mui/material';
// components
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsWithPagination, productCleanUp, searchProductsIdWithPagination, searchProductsNameWithPagination, singleProductCleanUp } from '../../redux/actions/product_actions';

import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';

import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
// mock
import USERLIST from '../../_mock/user';
import PRODUCTS from '../../_mock/products';
import ProductDeleteDialog from './components/ProductDeleteDialog';
import Loading from 'src/share/Loading/Loading';
import PermissionDenied from 'src/share/permission_denied/PermissionDenied';
import { parse } from 'date-fns';
import Paginate from 'src/share/Pagination/Pagination';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'index', label: 'Index', alignRight: false },
  { id: 'productId', label: 'Product ID', alignRight: false },
  { id: 'name', label: 'Product Name', alignRight: false },
  { id: 'productCategory', label: 'Product Category', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'action', label: 'Action' },
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

export default function ProductLists() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [myIndex, setMyIndex] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [newPage, setNewPage] = useState(0);

  const products = useSelector((state) => state.product.products);
  const productsLoading = useSelector((state) => state.product.loading);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setNewPage(newPage)
    if (newPage > pageCount) {
      setNewPage(newPage + 1)
      setPageCount(newPage)
      setMyIndex(rowsPerPage + myIndex)
    }
    else {
      setPageCount(newPage)
      setMyIndex(myIndex - rowsPerPage)

    }

  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setNewPage(0)
    setMyIndex(1)
    setPageCount(0)
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.data == undefined ? [] : products.data.length) : 0;

  const filteredUsers = applySortFilter(products.data == undefined ? [] : products.data, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const [hasProductListPermission, setHasProductListPermission] = useState(false);

  const staffLoading = useSelector((state) => state.user.isLoading);
  const staff = useSelector((state) => state.user.user);

  const productPermissionDenine = useSelector((state) => state.product.deninePermission);


  const [hasProductEditPermission, setHasProductEditPermission] = useState(false);
  const [hasProductDeletePermission, setHasProductDeletePermission] = useState(false);
  const [paginateLoading, setPaginateLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);

  const setSliderPermission = (permissions) => {
    for (let i = 0; i < permissions.length; i++) {
      if (permissions[i].name == "product-edit") {
        setHasProductEditPermission(true)
      }
      if (permissions[i].name == "product-delete") {
        setHasProductDeletePermission(true)
      }
    }

  }

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [productName, setProductName] = useState('');
  const [productID, setProductID] = useState('');

  const paginate = (pageNumber) => {

    // dispatch(cleanUpPagination())
    dispatch(productCleanUp())
    setPaginateLoading(true)
    console.log("Loading")
    setPageNumber(pageNumber)
    dispatch(fetchProductsWithPagination(pageNumber))
    // console.log(pageNumber);
    // console.log("dis")


    setCurrentPage(pageNumber);
    document.documentElement.scrollTop = 0;
    setTimeout(() => {
      setPaginateLoading(false)
    }, "3000")
    
  };

  const handleSearchWithProductname = (e) => {
    e.preventDefault();
    dispatch(productCleanUp())
    dispatch(searchProductsNameWithPagination(productName, 'null', pageNumber))

  }
  const handleSearchWithProductID = (e) => {
    e.preventDefault();
    dispatch(productCleanUp())
    dispatch(searchProductsIdWithPagination('null', productID, pageNumber))
  }

  const handleGetData = (e) => {
    e.preventDefault();
    dispatch(productCleanUp())
    dispatch(fetchProductsWithPagination(pageNumber))
  }


  const [isSearchId, setSearchId] = useState(false);
  const [radioValue, setRadioValue] = useState("name");
  const handleRadio = (e) => {
    e.target.value == "productID" ? setSearchId(true) : setSearchId(false)
  }

  useEffect(() => {
    dispatch(fetchProductsWithPagination(pageNumber))

    if (!staffLoading) {
      setSliderPermission(staff.permissions)
      setPaginateLoading(false)
    }

    return () => {

      dispatch(singleProductCleanUp())


    }
  }, [staff && staff.permissions])

  return (
    <Page title="Product Lists">
      {
        staffLoading ?
          <Loading />
          :
           
          <>
            {
              productPermissionDenine ?
                <PermissionDenied />
                :
                productsLoading ?
                  <Loading/>
                  :
                <>
                  <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

                      <Typography variant="h4" gutterBottom color="#1B458D">
                        Products
                      </Typography>
                      <Button variant="contained" component={RouterLink} to="/dashboard/createproduct" startIcon={<Iconify icon="eva:plus-fill" />}>
                        Add New Products
                      </Button>

                    </Stack>
                    <Paginate currentPage={pageNumber} totalPage={products.last_page} paginate={paginate} />
                    <div onChange={handleRadio}>
                      <input style={{ margin: "10px" }} type="radio" value="productName" name="search" checked={radioValue === "name"} onChange={e => setRadioValue("name")} /> Search With Product Name
                      <input style={{ margin: "10px" }} type="radio" value="productID" name="search" checked={radioValue === "id"} onChange={e => setRadioValue("id")} /> Search With Product ID

                    </div>

                    <Box
                      display="flex"
                      justifyContent="start"
                    >
                      <form onSubmit={handleSearchWithProductname}>
                        <TextField color='primary' sx={{ m: 1 }} disabled={isSearchId ? true : false} onChange={e => setProductName(e.target.value)} id="outlined-basic" label="Search With Product Name" variant="outlined" />
                        {/* <Input
                          onChange={e=>setProductName(e.target.value)}
                          color="primary"
                          disabled={isSearchId ? true : false}
                          placeholder="Search With Product Name"
                          size="md"
                          variant="outlined"
                          sx={{ m: 2 }}
                        /> */}
                      </form>

                      <form onSubmit={handleSearchWithProductID}>
                        <TextField color='primary' sx={{ m: 1 }} disabled={isSearchId ? false : true} onChange={e => setProductID(e.target.value)} id="outlined-basic" label="Search With Product ID" variant="outlined" />

                        {/* <Input
                          onChange={e=>setProductID(e.target.value)}
                          color="primary"
                          disabled={isSearchId ? false : true}
                          placeholder="Search With Product ID"
                          size="md"
                          variant="outlined"
                          sx={{ m: 2 }}
                        /> */}
                      </form>
                    </Box>
                    
                      

                    <Card>
                      <Box display="flex" justifyContent="start" alignItems="center">

                        <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                        <Chip label="Get Data" onClick={handleGetData} />

                      </Box>
                      

                      <Scrollbar>
                      {
                        paginateLoading  ?
                          <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                          </Box>
                          :
                          <></>
                      }


                        <TableContainer sx={{ minWidth: 800, maxHeight: 600 }}>
                          <Table stickyHeader >
                            <UserListHead
                              order={order}
                              orderBy={orderBy}
                              headLabel={TABLE_HEAD}
                              rowCount={products.data.length}
                              // numSelected={selected.length}
                              onRequestSort={handleRequestSort}
                            // onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>

                              {/* {
                                products.data.map((data,index)=>(
                                  <TableRow
                                    hover
                                    key={index}
                                    tabIndex={-1}
                                  >
                                    <TableCell padding="checkbox" />
                                    <TableCell align="left">{myIndex + index}</TableCell>
                                    <TableCell component="th" scope="row" padding="none">
                                      <Stack direction="row" alignItems="center" spacing={2}>

                                        <Typography variant="subtitle2" noWrap>
                                          {data.item_id}
                                        </Typography>
                                      </Stack>
                                    </TableCell>
                                    <TableCell align="left">{data.name}</TableCell>
                                    <TableCell align="left">{data.category.name}</TableCell>
                                    
                                    <TableCell align="left">{data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MMK</TableCell>
                                    <TableCell align="left">
                                      <Box display="flex" justifyContent="left" alignItems="center">

                                        {
                                          hasProductDeletePermission ?
                                            <ProductDeleteDialog productName={data.name} productId={data.id} />
                                            :
                                            ""
                                        }

                                        {
                                          hasProductEditPermission ?
                                            <Link to={`/dashboard/products/${data.id}`}>
                                              <Icon icon="ant-design:edit-twotone" width={28} height={28} />
                                            </Link>
                                          :
                                          ""
                                        }



                                      </Box>
                                    </TableCell>
                                  </TableRow>
                                ))
                              } */}
                              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const { id, name, role, price, company, avatarUrl, isVerified, item_id, category } = row;
                                const isItemSelected = selected.indexOf(name) !== -1;

                                return (
                                  <TableRow
                                    hover
                                    key={id}
                                    tabIndex={-1}

                                  >
                                    <TableCell padding="checkbox" />

                                    <TableCell align="left">{ pageNumber == "1" ? myIndex+index : pageNumber * 100 + index + myIndex - 100}</TableCell>
                                    <TableCell component="th" scope="row" padding="none">
                                      <Stack direction="row" alignItems="center" spacing={2}>

                                        <Typography variant="subtitle2" noWrap>
                                          {item_id}
                                        </Typography>
                                      </Stack>
                                    </TableCell>
                                    <TableCell align="left">{name}</TableCell>
                                    <TableCell align="left">{category.name}</TableCell>
                                    <TableCell align="left">{price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MMK</TableCell>
                                    <TableCell align="left">
                                      <Box display="flex" justifyContent="left" alignItems="center">

                                        {
                                          hasProductDeletePermission ?
                                            <ProductDeleteDialog productName={name} productId={id} />
                                            :
                                            ""
                                        }

                                        {
                                          hasProductEditPermission ?
                                            <Link to={`/dashboard/products/${id}`}>
                                              <Icon icon="ant-design:edit-twotone" width={28} height={28} />
                                            </Link>
                                            :
                                            ""
                                        }



                                      </Box>
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
                        rowsPerPageOptions={[50, 100]}
                        component="div"
                        count={products.data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Card>
                  </Container>
                </>
            }
          </>
      }
    </Page>
  );
}
