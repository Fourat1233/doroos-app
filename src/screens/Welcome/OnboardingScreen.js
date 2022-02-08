import React from 'react';
import { View, ScrollView, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, { colors } from './styles/index.style';
import { ENTRIES1 } from './static/entries';
import { fonts } from '../../assets/styles/theme';
import AsyncStorage from '@react-native-community/async-storage';

const SLIDER_1_FIRST_ITEM = 1;

export class OnboardingComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    }
  }

  _skipe = async () => {
    await AsyncStorage.setItem('firstAccess', 'No')
    this.props.navigation.navigate('Main')
  }


  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />;
  }

  main(title) {
    const { slider1ActiveSlide } = this.state;

    return (
      <SafeAreaView style={styles.exampleContainer}>
        <Image source={require('../../assets/images/white_logo_doroos.png')} style={{ alignSelf: 'center' }} />
        <Carousel
          ref={c => this._slider1Ref = c}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
        <Text style={[styles.title, { ...fonts.black, marginBottom: 10 }]}>{`Find your Teacher`}</Text>
        <Text style={[styles.subtitle, { marginBottom: 20, ...fonts.light, marginHorizontal: 20 }]}>{title}</Text>
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </SafeAreaView>
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={['#e74295', '#7f509b']}
        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
        style={styles.gradient}
      />
    );
  }

  render() {
    const slider = this.main('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad');
    return (
      <View style={styles.safeArea}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#82c543" barStyle="light-content" />
          {this.gradient}
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {slider}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => this._skipe()}
                style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, paddingVertical: 15, borderWidth: 2, borderRadius: 40, borderColor: 'white' }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Skipe</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
