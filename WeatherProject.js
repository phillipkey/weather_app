import React, {Component} from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import Forecast from './Forecast';
import OpenWeatherMap from './utility/open_weather_map';

export default class WeatherApp extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = { zip: '', forecast: null};
    }

    _hanldeTextChange = (event) => {
        let zip = event.nativeEvent.text;
        this.setState({zip: zip});
        OpenWeatherMap.fetchForecast(zip).then(forecast => {
            console.log(forecast);
            this.setState({ forecast: forecast });
        })
    }

  render() {
      let content = null;
      if (this.state.forecast !== null) {
          content = (
              <Forecast 
                main={this.state.forecast.main}
                description={this.state.forecast.description}
                temp={this.state.forecast.temp}
              />
          )
      }
    return (
      <View style={styles.container}>
        <ImageBackground  source={require('./res/flowers.png')}
        resizeMode='cover'
        style={styles.backdrop}>
            <View style={styles.overlay}>
                <View style={styles.row}>
                    <Text style={styles.mainText}>
                        Current Weather for
                    </Text>
                    <View style={styles.zipContainer}>
                        <TextInput style={[styles.zipCode, styles.mainText]}
                        onSubmitEditing={this._hanldeTextChange}
                        underlineColorAndroid='transparent'
                        keyboardType='number-pad'
                        maxLength={5}/>
                    </View>
                </View>
                {content}
            </View>
        </ImageBackground>
      </View>
    );
  }
}

const baseFontSize = 16;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#666666',
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    overlay: {
        paddingTop: 5,
        backgroundColor: '#000000',
        opacity: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        padding: 20
    },
    zipContainer: {
        height: baseFontSize + 10,
        paddingTop: 0,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginTop: 2
    },
    zipCode: {
        flex: 1,
        flexBasis: 1,
        width: 50,
        height: baseFontSize
    },
    mainText: {
        fontSize: baseFontSize,
        color: '#FFFFFF'
    }
});