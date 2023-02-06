import { Badge, Button, IconButton, Tooltip } from "@mui/material";
import "./Navbar.css";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { cartcontext } from "./Mycontext";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import PersonIcon from "@mui/icons-material/Person";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import NavigationIcon from "@mui/icons-material/Navigation";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import zIndex from "@mui/material/styles/zIndex";

const Navbar = () => {
  const [subtotal, setsubtotal] = React.useState(0);
  const [total, settotal] = React.useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [idd, setidd] = useState(0);
  const [errortext, seterrortext] = useState();
  const [openerror, setopenerror] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [totalAmount, settotalAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [otp, setotp] = useState();
  const [divdisplay, setdivdisplay] = useState("none");
  const [errorDisplay, seterrorDisplay] = useState("none");
  const [opencheckout, setOpencheckout] = useState(false);
  const [openlogin, setOpenlogin] = useState(false);
  const [opencontact, setOpencontact] = React.useState(false);
  const handleClosecontact = () => setOpencontact(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
  const theme = useTheme();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openempty = Boolean(anchorEl1);
  const handleClickEmpty = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleCloseEmpty = () => {
    setAnchorEl1(null);
  };
  const obj = React.useContext(cartcontext);
  // Open Cart Drawer
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    obj.setState({ ...obj.state, [anchor]: open });
  };

  React.useEffect(() => {
    var temp = 0;
    obj.mycart.map((i) => (temp = temp + i.total_price));
    if (temp > 500) {
      temp = temp + 40;
      setsubtotal(temp);
    } else {
      setsubtotal(temp);
    }
  }, [obj.mycart]);

  // Empty cart
  const emptyCart = () => {
    obj.mycart.map((i) => {
      i.quantity = 1;
      obj.setmycart([]);
    });
    setAnchorEl1(null);
  };
  // Delete Items  cartitems,setcartitems,userdetails
  const deleteItems = () => {
    let id = parseInt(idd);
    const items = obj.mycart.filter((i) => i.productId !== id);
    obj.mycart.map((i) => {
      if (i.productId === id) {
        i.quantity = 1;
        i.total_price = i.quantity * i.price;
      }
    });
    obj.setmycart([...items]);
    setAnchorEl(null);
  };
  // Delete Confirm
  const handleClickDel = (event) => {
    setidd(event.target.parentElement.id);
    setAnchorEl(event.currentTarget);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    obj.mycart.map((i) => {
      if (i.productId === id) {
        if (i.quantity > 1) {
          i.quantity = i.quantity - 1;
          i.total_price = i.price * i.quantity;
        }
      }
    });
    obj.setmycart([...obj.mycart]);
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    obj.mycart.map((i) => {
      if (i.productId === id) {
        i.quantity = i.quantity + 1;
        i.total_price = i.quantity * i.price;
      }
    });
    obj.setmycart([...obj.mycart]);
  };

  // Search products
  const searchProducts = () => {
    let text = document.getElementById("search").value;
    let txt = text.toLowerCase();
    var temp = [];
    obj.storeproducts.map((i) => {
      var name = i.pname.toLowerCase();
      if (name.includes(txt)) {
        temp.push(i);
        obj.setstoreproducts(temp);
      }
    });
    if (text === "") {
      obj.setstoreproducts(obj.categoryProducts);
    }
  };

  // Sort By Price
  const sortByPrice = (event) => {
    let value = event.target.value;
    if (value === "low_high") {
      var low = obj.storeproducts.sort(function (a, b) {
        return a.sellPrice - b.sellPrice;
      });
      obj.setstoreproducts([...low]);
    } else {
      let high = obj.storeproducts.sort(function (a, b) {
        return b.sellPrice - a.sellPrice;
      });
      obj.setstoreproducts([...high]);
    }
  };

  // Login using otp
  const sendOtp = () => {
    var mobile_num = document.getElementById("mobile").value;
    if (mobile_num === "") {
      setOpenlogin(true);
    } else {
      var a = Math.random() * 10000;
      var code = parseInt(a);
      alert("Your Otp is : " + code);
      setotp(code);
      setdisabled(true);
      setdivdisplay("block");
      setOpenlogin(false);
    }
  };

  // Validate Otp
  const validateOtp = () => {
    let otp1 = document.getElementById("otp").value;
    if (otp === parseInt(otp1)) {
      obj.setloggedin(true);
      seterrorDisplay("none");
      setOpen(false);
    } else {
      seterrorDisplay("block");
    }
  };

  // Logout user
  const logout = () => {
    obj.setloggedin(false);
    setdisabled(false);
    setdivdisplay("none");
  };

  // Checkout
  const checkout = () => {
    if (obj.loggedin === true) {
      setOpencontact(true);
      obj.setmycart([]);
    } else {
      setOpencheckout(true);
    }
  };
// Bottom to top button
  var mybutton = document.getElementById("myBtn");
  // When the user scrolls down , show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  // scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const handleCloseDel = () => {
    setAnchorEl(null);
  };
  const opendel = Boolean(anchorEl);
  const id = opendel ? "simple-popover" : undefined;
  const list = (anchor) => (
    <Box
      sx={{ width: "65vw" }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="mycart_div">
        <h2>My Cart ({obj.mycart.length} items)</h2>
        <h2>
          <Button
            id="basic-button"
            aria-controls={openempty ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openempty ? "true" : undefined}
            onClick={handleClickEmpty}
            sx={{
              fontWeight: "bold",
              marginLeft: "5vw",
              color: "red",
              fontSize: "2vh",
              backgroundColor: "white",
            }}
          >
            <ClearAllIcon /> Empty Cart
          </Button>
        </h2>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl1}
          open={openempty}
          onClose={handleCloseEmpty}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem>Do You want to clear all items?</MenuItem>
          <MenuItem onClick={emptyCart} id="empty_yes">
            Yes
          </MenuItem>
          <MenuItem onClick={handleCloseEmpty} id="empty_no">
            No
          </MenuItem>
        </Menu>
        <h2>
          <Button
            onClick={toggleDrawer(anchor, false)}
            id="close_btn"
            variant="outlined"
          >
            <CloseIcon />
            Close
          </Button>
        </h2>
      </div>
      <div>
        {obj.mycart.length === 0 ? (
          <>
            <h2 className="cart_empty">Your Cart is Empty!</h2>
            <img src="./cartempty.png" alt="cart_empty" id="empty_cart_img" />
          </>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell id="table_heading">Image</TableCell>
                    <TableCell id="table_heading">Name</TableCell>
                    <TableCell id="table_heading">Qty x Price</TableCell>
                    <TableCell id="table_heading">Total</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {obj.mycart.map((row) => {
                    var a = row.productId;

                    return (
                      <>
                        <TableRow key={row.productId}>
                          <TableCell>
                            <img
                              src={row.pimage}
                              alt="img"
                              id="cart_product_img"
                            />
                          </TableCell>
                          <TableCell>
                            {row.pname} ({row.pUnit})
                          </TableCell>
                          <TableCell>
                            <TableRow>
                              <TableCell>
                                <button
                                  id="remove_btn"
                                  onClick={() =>
                                    decreaseQuantity(row.productId)
                                  }
                                >
                                 <i class="fa fa-minus" aria-hidden="true"></i>
                                </button>
                                 <span className="quantity_span">{row.quantity} </span>
                                <button
                                  id="add_btn"
                                  onClick={() =>
                                    increaseQuantity(row.productId)
                                  }
                                >
                                  <i class="fa fa-plus" aria-hidden="true"></i>
                                </button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell id="cart_price">
                                X &#8377;{row.price}
                              </TableCell>
                            </TableRow>
                          </TableCell>
                          <TableCell>&#8377;{row.total_price}</TableCell>
                          <TableCell>
                            <TableCell>
                              <Button
                                aria-describedby={id}
                                onClick={handleClickDel}
                                id={a}
                              >
                                <DeleteIcon id={a} />
                              </Button>
                              {/* Delete single items */}
                              <Popover
                                open={opendel}
                                anchorEl={anchorEl}
                                onClose={handleCloseDel}
                                anchorOrigin={{
                                  vertical: "bottom",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  onClick={deleteItems}
                                  id="delete_btn"
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={handleCloseDel}
                                  id="edit_btn"
                                >
                                  Cancel
                                </Button>
                              </Popover>
                            </TableCell>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Table>
              <TableRow>
                <TableCell>Delivery Charge</TableCell>{" "}
                <TableCell>&#8377; 0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>&#8377; {subtotal}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  {/* <Button
                    disabled={opencheckout}
                    variant="outlined"
                    onClick={() => {
                      setOpencheckout(true);
                    }}
                  >
                    Re-open
                  </Button> */}
                  <Button
                    disabled={opencheckout}
                    variant="contained"
                    id="checkout_btn"
                    onClick={checkout}
                  >
                    Checkout
                  </Button>
            <Modal
              open={opencontact}
              onClose={handleClosecontact}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Order Confirmation :
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                   Thank You , Your Order has been Placed.
                </Typography>
              </Box>
            </Modal>
                </TableCell>
                <Box sx={{ width: "100%" }}>
                  <Collapse in={opencheckout}>
                    <Alert
                      action={
                        <IconButton
                          aria-label="close"
                          size="small"
                          sx={{ color: "red" }}
                          onClick={() => {
                            setOpencheckout(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2, color: "red" }}
                    >
                      Please Login First !
                    </Alert>
                  </Collapse>
                </Box>
              </TableRow>
            </Table>
          </>
        )}
      </div>
    </Box>
  );

  return (
    <>
      <div className="download_div">
      <Button onClick={topFunction} id="myBtn" title="Go to top">
        <NavigationIcon/>
      </Button>
        <div className="download_text">Download WAY2DOOR APP</div>
        <div className="delivery_location">
          <i class="fa-solid fa-map-pin"></i> Selected Delivery Location :
          Lucknow (226010)
        </div>
      </div>
      <div className="navbar_main">
        <div className="navbar_sub1">
          <img
            src="http://www.way2door.com/images/way2door-min.png"
            alt="img"
            id="logo"
          />
        </div>
        <h5 className="navbar_sub2">
          Today's order will be delivered tomorrow. सबसे सस्ता और सबसे अच्छा.
        </h5>
        <div className="navbar_sub3">
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Badge badgeContent={obj.mycart.length} color="primary">
                <Button onClick={toggleDrawer(anchor, true)}>
                  <i class="fa-brands fa-opencart" id="cart_icon"></i>
                </Button>
              </Badge>
              <Drawer
                anchor={anchor}
                open={obj.state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="navbar_2">
        <div className="site_name">Fruits and Vegetable store</div>
        <div>
          <select onChange={sortByPrice}>
            <option>Sort By Price :</option>
            <option value="low_high">Low to High</option>
            <option value="high_low">High to Low</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by Product Name..."
            id="search"
            onChange={searchProducts}
          />
        </div>
        {obj.loggedin === false ? (
          <div className="login">
            <Tooltip title="Login / Signup">
              <IconButton sx={{ color: "#6a8a0a",paddingRight:"2vw"}} onClick={handleClickOpen}>
                <PersonIcon sx={{ fontSize: "6vh",color:"white"}} />
              </IconButton>
            </Tooltip>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                <div className="mobile_login">Login Using Mobile Number :</div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div>
                    <div className="mobile_div">
                      Mobile Number:{" "}
                      <input
                        type="number"
                        placeholder="Enter Mobile Number"
                        id="mobile"
                        disabled={disabled}
                      />
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    onClick={sendOtp}
                    disabled={disabled}
                  >
                    Send Otp
                  </Button>
                  <Box sx={{ width: "100%" }}>
                    <Collapse in={openlogin}>
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            size="small"
                            sx={{ color: "red" }}
                            onClick={() => {
                              setOpenlogin(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2, color: "red" }}
                      >
                        Please Enter Mobile Number !
                      </Alert>
                    </Collapse>
                  </Box>

                  <div
                    className="mobile_div"
                    style={{
                      marginTop: "1vw",
                      marginBottom: "1vw",
                      display: divdisplay,
                    }}
                  >
                    <input
                      type="number"
                      placeholder="Enter OTP  Here"
                      id="otp"
                    />
                    <br />
                    <Button variant="contained" onClick={validateOtp}>
                      Login
                    </Button>
                    <div
                      className="otp_notmatched"
                      style={{ display: errorDisplay }}
                    >
                      Otp Not Matched! Please try again...
                    </div>
                  </div>
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  X Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <div>
            {" "}
            <Tooltip title="Logout">
              <IconButton sx={{ color: "#6a8a0a" ,paddingRight:"2vw"}} onClick={logout}>
                <span className="user_name">Hii Satyam</span>{" "}
                <LogoutIcon sx={{ fontSize: "6vh", color: "#8B0000" }} />
              </IconButton>
            </Tooltip>
          </div>
        )}

        {/* <LinearProgress/> */}
      </div>
      <div></div>
    </>
  );
};
export default Navbar;
