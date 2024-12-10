const info = {
  logo: '/src/assets/image/home/logo.png',  //30*30
  titleShow: '2',  // 1 img  2 text
  titleImg: '/src/assets/image/home/title.png',  //140*40
  titleText: 'BUBBLE GAME',
  titleSize: '30px',
  titleColor: '#00ff00',
  headerBgcolor: '',
  theme:{
    bgcolor: 'linear-gradient(to bottom, #ff7e5f, #feb47b)',
    foreground: '##{theme_foreground}',
  },
  pageFooter:{
    isShow: '##{pageFooter_isShow}',  // 1 展示  0 不展示
    text: '##{pageFooter_text}',
    color: '##{pageFooter_color}',
    fontSize: '15px',
    bgcolor: '#fff',
  },
  policy: {
    text: '##{policy_text}',
    textColor: '##{policy_textColor}',
    keyColor: '##{keyColor}',
    btnText: '##{policy_btnText}',
    btnColor: '##{policy_btnColor}',
    btnBgColor: '##{policybtnBgColor}',
    bgcolor: '#fff',
  },
  classifyList: [
    {
      icon: 'Girls',
      title: 'Girls',
      layout: '2',
    },
    {
      icon: 'Action',
      title: 'Action',
      layout: '2',
    },
    {
      icon: 'Boys',
      title: 'Boys',
      layout: '3',
    },
    {
      icon: 'Racing',
      title: 'Racing',
      layout: '5',
    },
    {
      icon: 'Baby Hazel',
      title: 'Baby Hazel',
      layout: '5',
    },
    {
      icon: 'Puzzle',
      title: 'Puzzle',
      layout: '2',
    },
    {
      icon: 'Adventure',
      title: 'Adventure',
      layout: '2',
    },
  ],
  menu: {
    btnColor: '#fff',
    btnActiveColor: '#0078d4',
    menuColor: '#fff',
    menuBgcolor: '#92beb6',
  },
  details: {
    bgcolor: '#1e1e1e',
    headerColor: '##{details_headerColor}',
    nameColor: '##{details_nameColor}',
    nameTextFamily: '黑体',
    descColor: '##{details_descColor}',
    descTextFamily: '##{details_descColor}',
    btnShape: '2',  // 1 长方形  2 圆角
    btnColor: '##{details_btnColor}',
    btnBgcolor: 'red',
    isFilter: '1',  // 1 展示  0 不展示
  },
  game: {
    radius: '2',  // 1 方形  2 圆角
  },
  otherGame: '2'  // 1..  2..  3.. 
}

export default info