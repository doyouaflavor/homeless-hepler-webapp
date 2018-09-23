import React from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import WhiteLogo from '../dist/images/life_whitelogo.png';
import G0v from '../dist/images/poweredby-square-i.png';

class Footer extends React.Component {

  render() {
    return (
      <div className="footer">
        <Grid container direction='row' alignItems='center' justify='center' className="frame">
          <Grid item xs={12} md={6}>
            <div className="block">
              <img src={WhiteLogo} alt="人生百味white-logo" className="life-logo"/>
              <a href="https://www.facebook.com/Do.you.a.flavor/" target="_blank">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://medium.com/%E4%BA%BA%E7%94%9F%E7%99%BE%E5%91%B3" target="_blank">
                <i className="fab fa-medium"></i>
              </a>
              <a href="https://www.instagram.com/doyouaflavor/" target="_blank">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="block">
              <h2>
                10848 台北市萬華區貴陽街 2 段 202 號 2 樓
                <a href="https://maps.google.com/?q=台北市萬華區貴陽街二段202號2樓" target="_blank">
                  <i className="fas fa-map-marker-alt" style={{fontSize: '1.5em'}}></i>
                </a>
              </h2>
              <h2>
                2F, No. 202, Sec. 2, Guiyang St., Wanhua Dist., Taipei City 108, Taiwan
                <a href="https://maps.google.com/?q=No. 202, Sec. 2, Guiyang St., Wanhua Dist., Taipei City" target="_blank">
                  <i className="fas fa-map-marker-alt" style={{fontSize: '1.5em'}}></i>
                </a>
              </h2>
            </div>
            <div className="block">
              <h3>welcome@doyouaflavor.tw</h3>
              <h2>媒體聯絡人：盈婕 (02) 2371-2771</h2>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="right">
            <a href="https://grants.g0v.tw/power/" target="_blank">
              <img src={G0v} alt="g0v logo"/>
            </a>
            <h2>Copyright © 2018 DoYouAFlavor All Rights Reserved.</h2>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Footer;
