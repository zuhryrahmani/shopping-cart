import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { makeStyles } from '@material-ui/core';
import { Button, Icon, Input } from 'semantic-ui-react';

// components
import Item from './components/Item';

// assets
import whiteTshirt from './assets/images/tshirt-white.png';
import blackTshirt from './assets/images/tshirt-black.png';
import whiteShirt from './assets/images/shirt-white.png';
import orangeJacket from './assets/images/jacket-orange.png';
import brownJacket from './assets/images/jacket-brown.png';

const App = () => {

  const [data, setData] = useState([
    {
      name: 'White t-shirt',
      type: 'tshirt',
      color: 'white',
      size: 'L',
      price: 9.05,
      picture: whiteTshirt,
      id: 0,
      wishlist: false,
      total: 1
    },
    {
      name: 'Black t-shirt',
      type: 'tshirt',
      color: 'black',
      size: 'M',
      price: 9.05,
      picture: blackTshirt,
      id: 1,
      wishlist: false,
      total: 1
    },
    {
      name: 'White shirt',
      type: 'shirt',
      color: 'white',
      size: 'L',
      price: 17.54,
      picture: whiteShirt,
      id: 2,
      wishlist: false,
      total: 1
    },
    {
      name: 'Orange jacket',
      type: 'jacket',
      color: 'orange',
      size: 'XL',
      price: 22.10,
      picture: orangeJacket,
      id: 3,
      wishlist: false,
      total: 1
    },
    {
      name: 'Brown jacket',
      type: 'jacket',
      color: 'brown',
      size: 'L',
      price: 25.67,
      picture: brownJacket,
      id: 4,
      wishlist: false,
      total: 1
    },
  ]);
  console.log('LOOK DATA', data);
  const [openDiscount, setOpenDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [total, setTotal] = useState(0);

  const useStyles = makeStyles({
    header: {
      height: 100,
      fontSize: 30,
      fontWeight: 700,
      lineHeight: '100px',
      textAlign: 'center',
      backgroundColor: '#F7F7F7'
    },
    container: {
      maxWidth: 1000,
      margin: '0 auto',
      padding: 30,
      display: 'flex'
    },
    left: {
      flex: 'auto',
      paddingRight: 30
    },
    right: {
      width: 300,
    },
    paper: {
      backgroundColor: '#fff',
      borderRadius: 8,
      boxShadow: '0 5px 12px 0 rgba(0,0,0,0.2)',
      padding: 15
    },
    title: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 15
    },
    button: {
      '&.ui.button': {
        fontWeight: 400
      }
    },
    accordion: {
      height: openDiscount ? 43 : 0,
      overflow: 'hidden',
      transition: '0.2s'
    },
  });
  const classes = useStyles();

  const handleRemove = id => {
    setData(data.filter(item => item.id !== id));
  };
  const handleWishlist = id => {
    let arr = data;
    arr[id].wishlist = !arr[id].wishlist;
    setData([...arr]);
  };
  const handleMinus = id => {
    let arr = data;
    arr[id].total = arr[id].total > 0 ? arr[id].total - 1 : 0;
    setData([...arr]);
  };
  const handlePlus = id => {
    let arr = data;
    arr[id].total = arr[id].total + 1;
    setData([...arr]);
  };

  useEffect(() => {
    if(data.length > 0) {
      let result = 0;
      data.map((item, i) => {
        result += data[i].total * data[i].price;
      })
      setTotal(result);
    } else {
      setTotal(0);
    };
  }, [data]);

  return (
    <div>
      <div className={classes.header}>Shopping Cart</div>
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.paper}>
            <div className={classes.title}>Cart ({data.length} items)</div>
            {data.map((item, i) => (
              <div style={{marginTop: i===0 ? 0 : 15}}>
                <Item
                  data={item}
                  onClickRemove={() => handleRemove(item.id)}
                  onClickWishlist={() => handleWishlist(item.id)}
                  onClickMinus={() => handleMinus(item.id)}
                  onClickPlus={() => handlePlus(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.right}>
          <div style={{position:'sticky', top:20}}>
            <div className={classes.paper} style={{marginBottom:30}}>
              <div className={classes.title}>The total amount of</div>
              <div style={{display:'flex', marginBottom:10}}>
                <div style={{width:'60%'}}>Temporary amount</div>
                <div style={{width:'40%', textAlign:'right'}}>${total?.toFixed(2)}</div>
              </div>
              <div style={{display:'flex', marginBottom:10, borderBottom:'1px solid rgba(0,0,0,0.1)', paddingBottom:10}}>
                <div style={{width:'60%'}}>Shipping</div>
                <div style={{width:'40%', textAlign:'right'}}>Gratis</div>
              </div>
              <div style={{display:'flex', marginBottom:20, fontWeight:700}}>
                <div style={{width:'60%'}}>The total amount of (including VAT)</div>
                <div style={{width:'40%', textAlign:'right'}}>${total?.toFixed(2)}</div>
              </div>
              <Button primary fluid className={classes.button} onClick={() => alert(`Total payment is $${total?.toFixed(2)}`)}>GO TO CHECKOUT</Button>
            </div>
            <div className={classes.paper}>
              <div style={{display:'flex'}}>
                <div style={{flex:'auto'}}>Add a discount code (optional)</div>
                <div style={{width:'fit-content'}} onClick={() => setOpenDiscount(!openDiscount)}>
                  <Icon name={openDiscount ? 'chevron up' : 'chevron down'} style={{cursor:'pointer'}}/>
                </div>
              </div>
              <div className={classes.accordion}>
                <Input
                  value={discountCode}
                  onChange={e => setDiscountCode(e.target.value)}
                  placeholder='Discount Code'
                  fluid
                  style={{marginTop:5}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
