import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase-config.js'; // Importa tu configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';

export default function ActivityRegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fecha: '',
    valor: '',
    tipo: '', // Gasto o Ingreso
    categoria: '',
    cuenta: '',
    descripcion: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Validaciones básicas
      if (!formData.fecha || !formData.valor || !formData.tipo || !formData.categoria || !formData.cuenta) {
        Alert.alert("Error", "Por favor completa todos los campos");
        return;
      }

      // Guarda en Firestore
      await addDoc(collection(db, "Movimientos"), formData);
      Alert.alert("Éxito", "Movimiento registrado correctamente");
      navigation.navigate("HomeTab", { screen: "HomeScreen" }) // Redirige al Home
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al registrar el movimiento");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Actividad</Text>

      <Text style={styles.label}>Fecha</Text>
      <TextInput
        style={styles.input}
        placeholder="23/08/24"
        value={formData.fecha}
        onChangeText={(value) => handleInputChange('fecha', value)}
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        placeholder="100,000"
        value={formData.valor}
        onChangeText={(value) => handleInputChange('valor', value)}
        keyboardType="numeric"
      />

      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={[styles.radioButton, formData.tipo === 'Gasto' && styles.radioSelected]}
          onPress={() => handleInputChange('tipo', 'Gasto')}
        >
          <Text>Gasto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, formData.tipo === 'Ingreso' && styles.radioSelected]}
          onPress={() => handleInputChange('tipo', 'Ingreso')}
        >
          <Text>Ingreso</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Categoría</Text>
      <TextInput
        style={styles.input}
        placeholder="Salud"
        value={formData.categoria}
        onChangeText={(value) => handleInputChange('categoria', value)}
      />

      <Text style={styles.label}>Cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Bancolombia"
        value={formData.cuenta}
        onChangeText={(value) => handleInputChange('cuenta', value)}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Pago a la EPS"
        value={formData.descripcion}
        onChangeText={(value) => handleInputChange('descripcion', value)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
