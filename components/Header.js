import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RightButtonContext } from '../context/RightButtonContext';

import nowTheme from '../constants/Theme';

//const {butttonRight} = useContext(RightButtonContext)
const { width } = Dimensions.get('window');

const BellButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('Pro')}
  >
    <Text
      family="lato-semibold"
      size={16}
      name="bulb"
      color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    >lla</Text>
    <Block middle style={[styles.notify, { backgroundColor: nowTheme.COLORS[isWhite ? 'WHITE' : 'PRIMARY'] }]} />
  </TouchableOpacity>
);

const BasketButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Text
      family="lato-semibold"
      size={16}
      name="basket2x"
      color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    >llb</Text>
  </TouchableOpacity>
);



class Header extends React.Component {
  static contextType = RightButtonContext

  state = {
    isUpdate: true,
  };

  setUpdateFunction = ()=>{
    this.setState({ isUpdate: !this.state.isUpdate });
  }

  /*componentDidMount() {
    // Access context variable
    //console.log(this.context.isUpdate);
    
    // Listen for changes to context variable
    //console.log(RightButtonContext);
    this.unsubscribe = this.context.addListener(() => {
      console.log('Context variable changed:', this.context.isUpdate);
    });
    this.unsubscribe();
    
  }*/
  

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderRight = () => {
    const { white, title, navigation } = this.props;
    
    //const {butttonRight} = useContext(this.contextType)
    
    if (title === 'Title') {
      return [
        <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
        <BasketButton key="basket-title" navigation={navigation} isWhite={white} />
      ];
    }
    if (title === '') {
      return [this.context.butttonRight];
    }
    

    /*switch (title) {
      case 'Home':
        return [
          <BellButton key="chat-home" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-home" navigation={navigation} isWhite={white} />
        ];
      case 'Deals':
        return [
          <BellButton key="chat-categories" navigation={navigation} />,
          <BasketButton key="basket-categories" navigation={navigation} />
        ];
      case 'Categories':
        return [
          <BellButton key="chat-categories" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-categories" navigation={navigation} isWhite={white} />
        ];
      case 'Category':
        return [
          <BellButton key="chat-deals" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-deals" navigation={navigation} isWhite={white} />
        ];
      case 'Profile':
        return [
          <BellButton key="chat-profile" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-deals" navigation={navigation} isWhite={white} />
        ];
      case 'Account':
        return [
          <BellButton key="chat-profile" navigation={navigation} />,
          <BasketButton key="basket-deals" navigation={navigation} />
        ];
      case 'Product':
        return [
          <BellButton key="chat-profile" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-product" navigation={navigation} isWhite={white} />
        ];
      case 'Search':
        return [
          <BellButton key="chat-search" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-search" navigation={navigation} isWhite={white} />
        ];
      case 'Settings':
        return [
          <BellButton key="chat-search" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-search" navigation={navigation} isWhite={white} />
        ];
      default:
        break;
    }*/

  };
  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return (
      <Block row style={styles.options}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => console.log(navigation.navigate('Pro'))}
        >
          <Block row middle>
            <Text
              name="bulb"
              family="lato-semibold"
              size={18}
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            >llc</Text>
            <Text style={styles.tabTitle}>
              {optionLeft || 'Beauty'}
            </Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Text
              size={18}
              name="bag-162x"
              family="lato-semibold"
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            >lld</Text>
            <Text style={styles.tabTitle}>
              {optionRight || 'Fashion'}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {options ? this.renderOptions() : null}
        </Block>
      );
    }
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;

    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null
    ];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }, ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Button style={{width:45, height: 45, borderRadius: 11, opacity: title ? 1:.5, margin: 0 }} onPress={this.handleLeftPress}>
              <Ionicons name={back ? 'chevron-back' : 'menu'} size={20} color={nowTheme.COLORS.WHITE} />
            </Button>
          }
          leftStyle={{ marginLeft: 10}}
          titleStyle={[
            styles.title,
            { color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }, 
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'lato-bold'
  },
  navbar: {
    zIndex: 5,
    backgroundColor: "rgba(255, 0, 0, 1)"
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12
  },
  header: {
    backgroundColor: theme.COLORS.WHITE
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    fontFamily: 'lato-semibold',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
});

export default withNavigation(Header);