import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  itemListText,
  itemListTextStrike,
  circleInactive,
  circleActive,
  pillColor,
  deleteIconColor
} from '../constants/colors';
const { height, width } = Dimensions.get('window');
class List extends Component {
  onToggleCircle = () => {
    const { isCompleted, id, completeItem, incompleteItem } = this.props;
    if (isCompleted) {
      incompleteItem(id);
    } else {
      completeItem(id);
    }
  };

  render() {
    const { value, dosage, interval, endDate, notes, deleteItem, id, isCompleted, showItem} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.onToggleCircle}>
            <View
              style={[
                styles.circle,
                isCompleted
                  ? { borderColor: circleActive }
                  : { borderColor: circleInactive }
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              isCompleted
                ? {
                    color: itemListTextStrike,
                    textDecorationLine: 'line-through'
                  }
                : { color: itemListText }
            ]}
          >
            {value}
            </Text>
              <View style={styles.columnInterval}>
                <Text
                style={[
                  styles.text,
                  isCompleted
                    ? {
                        color: itemListTextStrike,
                        textDecorationLine: 'line-through'
                      }
                    : { color: itemListText }
                ]}
                >
                .    Interval  {interval}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPressOut={() => showItem(value, notes, endDate, dosage)}>
          <View style={styles.columnDosage}>
             <MaterialCommunityIcons
                name="pill"
                size={24}
                color={pillColor}
              />
          
            
          <Text
              style={[
                styles.text,
                isCompleted
                  ? {
                      color: itemListTextStrike,
                      textDecorationLine: 'line-through'
                    }
                  : { color: itemListText }
              ]}
              >
            {dosage}
          </Text>
        </View>
        </TouchableOpacity>
        {isCompleted ? (
          <View style={styles.button}>
            <TouchableOpacity onPressOut={() => deleteItem(id)}>
              <MaterialIcons
                name="done"
                size={24}
                color={deleteIconColor}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width - 50,
    flexDirection: 'row',
    borderRadius: 45,
    backgroundColor: 'white',
    height: width / 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 1.5
  },
  columnInterval: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnDosage:  {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:10
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 15
  },
  dosage: {
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 15
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    margin: 10
  },
  button: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
export default List;