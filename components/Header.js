import React, { useContext } from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Keyboard } from 'react-native';
import { Button, Block, NavBar, Text, theme, Button as GaButton } from 'galio-framework';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RightButtonContext } from '../context/RightButtonContext';

import nowTheme from '../constants/Theme';

const { height, width } = Dimensions.get(Platform.constants.Brand === "Windows" ? "window" : "screen");
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Header extends React.Component {
  static contextType = RightButtonContext

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderRight = () => {
    const { white, title, navigation } = this.props;

    return this.context.butttonRight;
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
          rightStyle={{ alignItems: 'flex-end', marginRight: 10}}
          left={
            <Button style={{width:45, height: 45, borderRadius: 11, opacity: title ? 1:.6, margin: 0 }} onPress={this.handleLeftPress}>
              <Ionicons name={back ? 'chevron-back' : 'menu'} size={20} color={nowTheme.COLORS.WHITE} />
            </Button>
          }
          leftStyle={{ alignItems: 'flex-start', marginLeft: 10}}
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