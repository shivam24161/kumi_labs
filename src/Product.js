import { Button, Rating } from "@mui/material";
import { useContext } from "react";
import data from "./Data";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./Product.css";
import { cartcontext } from "./Mycontext";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge} from "@mui/material";

const Product = () => {
  // offer mui popup
  const [open, setOpen] = React.useState(false);
  // Contact modal
  const [opencontact, setOpencontact] = React.useState(false);
  const handleOpencontact = () => setOpencontact(true);
  const handleClosecontact = () => setOpencontact(false);
  const theme = useTheme();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Contact info modal
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

  const obj = useContext(cartcontext);

  // Add to Cart
  const addToCart = (id) => {
    const isFound = obj.mycart.some((i) => {
      if (i.productId === id) {
        return true;
      }
      return false;
    });
    if (isFound) {
      obj.mycart.map((i) => {
        i.quantity = i.quantity + 1;
        i.total_price = i.quantity * i.price;
      });
    } else {
      data.map((i) => {
        if (i.productId === id) {
          obj.setmycart([...obj.mycart, i]);
        }
      });
    }
  };

  // Display by category
  const displayByCategory = (event) => {
    let category = event.target.id.toLowerCase();
    // style={{ backgroundColor: "#618007" }}
    let arr = [];
    if (category === "all_product") {
      document.getElementById("all_product").style.backgroundColor = "#618007";
      document.getElementById("fresh_fruits").style.backgroundColor =
        "aliceblue";
      document.getElementById("fresh_vegetables").style.backgroundColor =
        "aliceblue";
      document.getElementById("fresh_vegetables").style.backgroundColor =
        "aliceblue";
      document.getElementById("non_veg").style.backgroundColor = "aliceblue";
    } else if (category === "fresh_fruits") {
      document.getElementById("fresh_fruits").style.backgroundColor = "#618007";
      document.getElementById("all_product").style.backgroundColor =
        "aliceblue";
      document.getElementById("fresh_vegetables").style.backgroundColor =
        "aliceblue";
      document.getElementById("fresh_vegetables").style.backgroundColor =
        "aliceblue";
      document.getElementById("non_veg").style.backgroundColor = "aliceblue";
    } else if (category === "fresh_vegetables") {
      document.getElementById("all_product").style.backgroundColor =
        "aliceblue";
      document.getElementById("fresh_fruits").style.backgroundColor =
        "aliceblue";
      document.getElementById("fresh_vegetables").style.backgroundColor =
        "#618007";
      document.getElementById("dry_fruits").style.backgroundColor = "aliceblue";
      document.getElementById("non_veg").style.backgroundColor = "aliceblue";
    } else if (category === "dry_fruits") {
      document.getElementById("all_product").style.backgroundColor =
        "aliceblue";
      document.getElementById("fresh_fruits").style.backgroundColor =
        "aliceblue";
      document.getElementById("fresh_vegetables").style.backgroundColor =
        "aliceblue";
      document.getElementById("dry_fruits").style.backgroundColor = "#618007";
      document.getElementById("non_veg").style.backgroundColor = "aliceblue";
    } else if (category === "non_veg") {
      document.getElementById("non_veg").style.backgroundColor = "#618007";
      document.getElementById("all_product").style.backgroundColor =
        "aliceblue";
      document.getElementById("fresh_fruits").style.backgroundColor =
        "aliceblue";
      document.getElementById("fresh_vegetables").style.backgroundColor =
        "aliceblue";
      document.getElementById("dry_fruits").style.backgroundColor = "aliceblue";
    }
    if (category !== "all_product") {
      data.map((i) => {
        let categories = i.mainCat.toLowerCase();
        if (categories === category) {
          arr.push(i);
        }
      });
      obj.setstoreproducts(arr);
      obj.setcategoryProducts(arr);
    } else {
      obj.setstoreproducts(data);
      obj.setcategoryProducts(data);
    }
  };
  return (
    <>
      <div className="product_main">
        <div className="product_sub1">
          <h3 className="veg_express">LUCKNOW VEG EXPRESS</h3>
          <Rating value={3.5} precision={0.5} readOnly id="rating_stars" />
          <p className="rating_para">Average 3.5 / 5</p>
          <div>
            <Button variant="contained" id="user_reviews">
              User Reviews
            </Button>
            <Button
              variant="contained"
              id="contact_info"
              onClick={handleOpencontact}
            >
              COntact Info
            </Button>
            <Modal
              open={opencontact}
              onClose={handleClosecontact}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Contact information
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Store Name : Lucknow Veg Express Store <br />
                  Address : Vishal Khand Gomti Nagar 226010 Lucknow <br />
                  Store contact number : 9569967448
                </Typography>
              </Box>
            </Modal>
          </div>
          <div className="categories_div">
            <div
              className="category_div"
              onClick={displayByCategory}
              id="all_product"
            >
              <Button id="all_product">All Product</Button>
            </div>
            <div
              className="category_div"
              onClick={displayByCategory}
              id="fresh_fruits"
            >
              <Button id="fresh_fruits">Fresh Fruits</Button>
            </div>
            <div
              className="category_div"
              onClick={displayByCategory}
              id="fresh_vegetables"
            >
              <Button id="fresh_vegetables">Fresh Vegetables</Button>
            </div>
            <div
              className="category_div"
              onClick={displayByCategory}
              id="dry_fruits"
            >
              <Button id="dry_fruits">Dry Fruits</Button>
            </div>
            <div
              className="category_div"
              onClick={displayByCategory}
              id="non_veg"
            >
              <Button id="non_veg">Fresh Non Veg</Button>
            </div>
            <div className="cart_btn_div">
              <Badge badgeContent={obj.mycart.length} color="primary">
                <Button variant="outlined">
                  <ShoppingCartIcon id="cart_btn" />
                </Button>
              </Badge>
            </div>
          </div>
        </div>
        <div className="product_sub2">
          <div className="timing_div">
            <div>
              <span className="span_timing">Order Timing : </span>
              <span className="span_timing">8:00 am</span>{" "}
              <span className="span_timing1">To</span>{" "}
              <span className="span_timing">6:00 pm </span>
              <span className="span_store_close">Store Close</span>
            </div>
            <div>
              <Button
                variant="contained"
                id="my_offers"
                onClick={handleClickOpen}
              >
                My Offers
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  Today's offers :
                </DialogTitle>
                <DialogContent>
                  <img
                    src="http://www.way2door.com/images/offers/1639074303.jpg"
                    alt="offer"
                    id="offer_img"
                  />
                </DialogContent>
                <DialogContentText sx={{ textAlign: "center" }}>
                  * Minimum Order Amount for applying offer code is 500 rs.
                </DialogContentText>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    X Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <img src="./banner.png" id="banner" alt="banner" />

          {/* Displaying the products */}
          <div className="product_display_div">
            {obj.storeproducts.map((i) => {
              var a = (i.sellPrice / i.price) * 100;
              var b = 100 - a;
              var c = Math.round(b);
              return (
                <>
                  <div>
                    <p className="discount_para">{c} % Save</p>
                    <img src={i.pimage} alt="product" id="product_img" />
                    <p className="product_name_para">{i.pname}</p>
                    <div>
                      <span className="span_quantity">{i.pUnit}</span>
                      <span className="off_price">&#8377; {i.price}</span>
                      <span className="sale_price">&#8377; {i.sellPrice}</span>
                    </div>
                    <p>
                      <Button
                        id="add_to_cart_btn"
                        onClick={() => addToCart(i.productId)}
                      >
                        <ShoppingBagIcon sx={{ fontSize: "1.4vw" }} /> Add to
                        Basket
                      </Button>
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
