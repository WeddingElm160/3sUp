import React, { useContext, useEffect } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Video, ResizeMode } from 'expo-av';
import { AppIsReadyContext } from '../context/AppIsReadyContext';
import { useIsFocused } from '@react-navigation/native';
import { Images, nowTheme } from '../constants/';
const { height, width } = Dimensions.get(Platform.constants.Brand === "Windows" ? "window" : "screen");

export default function Onboarding(props) {

  const {videoReady} = useContext(AppIsReadyContext);
 
  const video = React.useRef(null);
  const { navigation } = props;

  const dectectIsFocused = useIsFocused();
  useEffect(() => {
    !dectectIsFocused ? video.current.pauseAsync() : video.current.playAsync()
  }, [dectectIsFocused]);

  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Block flex>
        {/*<ImageBackground
            source={Images.Onboarding}
            style={{  width: wp('100%'), height: hp('100%')+HeaderHeight, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center'}}
          />*/}
        <Video
          source={require("../assets/vids/background.mp4")}
          ref={video}
          style={styles.backgroundVideo}
          isMuted
          isLooping
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
          shouldPlay
          onLoad={()=>{videoReady()}}
        />
        <Block space="between" style={styles.padded}>
          <Block>
            <Block middle>
              <Image source={Images.Logo} style={{ width: 160, height: 160, bottom: 325, position: 'absolute' }} resizeMode='contain' />
            </Block>
            <Block>
              <Block middle style={{ border: '1px dashed red' }}>
                <Text
                  style={{
                    fontFamily: 'Novera-Classic-ExtraBold-Italic', bottom: 275, position: 'absolute', paddingHorizontal: 20, textAlign: 'center', textDecorationLine: 'underline'
                  }}
                  color="white"
                  size={44}
                >
                  3S UP!
                </Text>
              </Block>
            </Block>
            <Block middle row >
              <Text
                color="white"
                size={16}
                style={{ fontFamily: 'inter-medium' }}
              >
                Scan | Spend | Save UP!
              </Text>
            </Block>

            <Block
              row
              style={{
                marginTop: theme.SIZES.BASE,
                marginBottom: theme.SIZES.BASE * 2
              }}
            >
              <Button
                shadowless
                style={styles.button}
                color={nowTheme.COLORS.PRIMARY}
                onPress={() => navigation.navigate('App')}
              >
                <Text
                  style={{ fontFamily: 'lato-bold', fontSize: 14 }}
                  color={theme.COLORS.WHITE}
                >
                  INICIAR SESIÓN
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    left: 0,
    right: 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
    left: 0,
    right: 0,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 100,
    left: 0,
    right: 0,
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  },

  backgroundVideo: {
    height: height,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5
  }
});
