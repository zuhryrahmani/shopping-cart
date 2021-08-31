import React, { useState } from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { Button, Icon, Input } from 'semantic-ui-react';

const Item = ({data, onClickRemove, onClickWishlist, onClickMinus, onClickPlus, onChangeCount}) => {

  const [count, setCount] = useState(data ? data.total : 0);

  const w880 = useMediaQuery('(min-width:880px)');
  const w750 = useMediaQuery('(min-width:750px)');
  const w480 = useMediaQuery('(min-width:480px)');
  const useStyles = makeStyles({
    box: {
      paddingBottom: 15,
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      display: 'flex',
    },
    boxLeft: {
      height: w480 ? 160 : 180,
      width: 120,
      backgroundColor: '#E4E4E4',
      borderRadius: 6,
      boxShadow: '0 0 7px 0 rgba(0,0,0,0.2)',
      display: 'flex'
    },
    img: {
      width: 100,
      height: 140,
      margin: 'auto',
      objectFit: 'contain',
      objectPosition: 'center',
      filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))'
    },
    boxRight: {
      paddingLeft: 30,
      fontSize: 12,
      flex: 'auto',
      position: 'relative'
    },
    icon: {
      cursor: 'pointer',
    },
    count: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: 30,
      '& .ui.input': {
        width: 50,
        height: 30,
        borderRadius: 0,
        verticalAlign: 'top',
        '& input': {
          borderRadius: 0,
          lineHeight: '30px',
          padding: 0,
          borderRight: 'none',
          borderLeft: 'none',
          textAlign: 'center',
          '&:focus': {
            borderColor: 'rgba(34,36,38,.15)'
          }
        }
      },
      '& .ui.basic.button': {
        height: 30,
        lineHeight: '30px',
        padding: '0 11px',
        margin: 0
      }
    },
    countNew: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 30,
      height: 30,
      '& .ui.input': {
        width: 50,
        height: 30,
        borderRadius: 0,
        verticalAlign: 'top',
        '& input': {
          borderRadius: 0,
          lineHeight: '30px',
          padding: 0,
          borderRight: 'none',
          borderLeft: 'none',
          textAlign: 'center',
          '&:focus': {
            borderColor: 'rgba(34,36,38,.15)'
          }
        }
      },
      '& .ui.basic.button': {
        height: 30,
        lineHeight: '30px',
        padding: '0 11px',
        margin: 0
      }
    },
  });
  const classes = useStyles();

  const handleCount = e => {
    if(e.target.value === '' || e.target.value === '0') {
      setCount(0);
    } else if(Number(e.target.value)) {
      if(e.target.value.length > 1 && e.target.value[0] === '0') {
        const str = e.target.value.slice(1,e.target.value.length);
        setCount(Number(str));
      } else {
        setCount(Number(e.target.value));
      };
    };
  };

  return(
    <div className={classes.box}>
      <div className={classes.boxLeft}>
        <img src={data?.picture} className={classes.img} />
      </div>
      <div className={classes.boxRight}>
        <div style={{fontSize:16, fontWeight:700, marginBottom:10}}>{data?.name}</div>
        <div style={{marginBottom:10}}><span>{data?.type.toUpperCase()}</span> - <span>{data?.color.toUpperCase()}</span></div>
        <div style={{marginBottom:10}}>COLOR: {data?.color.toUpperCase()}</div>
        <div style={{marginBottom:w480 ? 20 : 10}}>SIZE: {data?.size.toUpperCase()}</div>
        <div style={{width:'100%'}}>
          <span className={classes.icon} style={{marginRight:15}} onClick={onClickRemove}>
            <Icon name='trash' color='grey'/>
            {w480 && 'REMOVE'}{w880 && ' ITEM'}
          </span>
          <span className={classes.icon} onClick={onClickWishlist}>
            <Icon name='like' color={data?.wishlist ? 'red' : 'grey'}/>
            {w880 && 'MOVE TO '}{w480 && 'WISH LIST'}
          </span>
          {w480 && <span style={{float:'right', fontSize:14, fontWeight:700}}>${data?.price}</span>}
        </div>
        <div className={classes.count}>
          {w480 ? (
            <div>
              <Button basic icon='minus' style={{borderRadius:'6px 0 0 6px'}} onClick={onClickMinus} />
              <Input
                value={data ? data.total : 0}
                onChange={onChangeCount}
              />
              <Button basic icon='plus' style={{borderRadius:'0 6px 6px 0'}} onClick={onClickPlus} />
            </div>
          ) : (
            <div style={{fontSize:14, fontWeight:700}}>${data?.price}</div>
          )}
        </div>
        {!w480 && (
          <div className={classes.countNew}>
            <Button basic icon='minus' style={{borderRadius:'6px 0 0 6px'}} onClick={onClickMinus} />
            <Input
              value={data ? data.total : 0}
              onChange={onChangeCount}
            />
            <Button basic icon='plus' style={{borderRadius:'0 6px 6px 0'}} onClick={onClickPlus} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;