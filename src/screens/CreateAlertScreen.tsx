import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateAlertScreen({ navigation }) {
  const [alertName, setAlertName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate); 
  };

  return (
    <View style={stylesCrear.container}>
      <Text style={stylesCrear.headerText}>Crear alerta</Text>

      <Text>Nombre de la alerta</Text>
      <TextInput
        style={stylesCrear.input}
        placeholder="Arriendo"
        value={alertName}
        onChangeText={setAlertName}
      />

      <Text>Monto</Text>
      <TextInput
        style={stylesCrear.input}
        placeholder="$400.000"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text>Fecha de recordatorio</Text>
      <TouchableOpacity onPress={showDatepicker}>
        <TextInput
          style={stylesCrear.input}
          placeholder="Selecciona una fecha"
          value={date.toLocaleDateString()} 
          editable={false} 
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity
        style={stylesCrear.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={stylesCrear.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesCrear = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: 'black',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
  },
});
