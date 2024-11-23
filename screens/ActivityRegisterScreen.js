import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { db } from "../firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { SelectInput } from "../components/SelectInput"; // Tu componente SelectInput personalizado

export default function ActivityRegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fecha: "",
    valor: "",
    tipo: "", // Gasto o Ingreso
    categoria: "",
    cuenta: "",
    descripcion: "",
  });
  const [accounts, setAccounts] = useState([]); // Lista de cuentas
  const [categories, setCategories] = useState([]); // Lista de categorías
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para obtener cuentas desde Firebase
  const fetchAccounts = async () => {
    try {
      const accountsCollection = collection(db, "Cuentas");
      const snapshot = await getDocs(accountsCollection);
      const accountsList = snapshot.docs.map((doc) => ({
        value: doc.id,
        label: doc.data().name,
      }));
      setAccounts(accountsList);
    } catch (error) {
      console.error("Error al obtener las cuentas: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener categorías activas dependiendo del tipo
  const fetchCategories = async (tipo) => {
    try {
      const categoryCollection =
        tipo === "Gasto" ? "Categoria_gasto" : "Categoria_ingreso";

      const categoriesQuery = query(
        collection(db, categoryCollection),
        where("activo", "==", true)
      );
      const querySnapshot = await getDocs(categoriesQuery);
      const categoryList = querySnapshot.docs.map((doc) => ({
        value: doc.id,
        label: doc.data().nombre, // Asumiendo que el campo es `nombre`
      }));
      setCategories(categoryList);
    } catch (error) {
      console.error("Error al obtener categorías: ", error);
    }
  };

  useEffect(() => {
    fetchAccounts(); // Llama a la función cuando se monte el componente
  }, []);

  useEffect(() => {
    if (formData.tipo) {
      fetchCategories(formData.tipo); // Cargar categorías cuando se cambia el tipo
    }
  }, [formData.tipo]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const getAccountByName = async (accountName) => {
    try {
      const accountsCollection = collection(db, "Cuentas");
      const q = query(accountsCollection, where("name", "==", accountName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0];
      } else {
        throw new Error("Cuenta no encontrada");
      }
    } catch (error) {
      console.error("Error al obtener la cuenta:", error);
      throw error;
    }
  };

  const updateAccountBalance = async () => {
    try {
      const accountDoc = await getAccountByName(formData.cuenta);
      const accountData = accountDoc.data();
      const currentBalance = accountData.initialBalance || 0;

      const movementValue = parseFloat(formData.valor);
      if (isNaN(movementValue)) {
        Alert.alert("Error", "El valor ingresado no es válido");
        return;
      }

      const newBalance =
        formData.tipo === "Gasto"
          ? currentBalance - movementValue
          : currentBalance + movementValue;

      await updateDoc(accountDoc.ref, { initialBalance: newBalance });
      console.log("Balance actualizado: ", newBalance);
    } catch (error) {
      console.error("Error al actualizar el balance: ", error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      if (
        !formData.fecha ||
        !formData.valor ||
        !formData.tipo ||
        !formData.categoria ||
        !formData.cuenta
      ) {
        Alert.alert("Error", "Por favor completa todos los campos");
        return;
      }

      await addDoc(collection(db, "Movimientos"), formData);
      await updateAccountBalance();

      Alert.alert("Éxito", "Movimiento registrado correctamente");
      navigation.navigate("HomeTab", { screen: "HomeScreen" });
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al registrar el movimiento");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrar Actividad</Text>

        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          placeholder="23/08/24"
          value={formData.fecha}
          onChangeText={(value) => handleInputChange("fecha", value)}
        />

        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          placeholder="100,000"
          value={formData.valor}
          onChangeText={(value) => handleInputChange("valor", value)}
          keyboardType="numeric"
        />

        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              formData.tipo === "Gasto" && styles.radioSelected,
            ]}
            onPress={() => handleInputChange("tipo", "Gasto")}
          >
            <Text>Gasto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              formData.tipo === "Ingreso" && styles.radioSelected,
            ]}
            onPress={() => handleInputChange("tipo", "Ingreso")}
          >
            <Text>Ingreso</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Categoría</Text>
        <SelectInput
          label="Selecciona una categoría"
          options={categories}
          selectedValue={formData.categoria}
          onValueChange={(value) => handleInputChange("categoria", value)}
        />

        <Text style={styles.label}>Cuenta</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <SelectInput
            label="Selecciona una cuenta"
            options={accounts}
            selectedValue={formData.cuenta}
            onValueChange={(value) => handleInputChange("cuenta", value)}
          />
        )}

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Pago a la EPS"
          value={formData.descripcion}
          onChangeText={(value) => handleInputChange("descripcion", value)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  radioSelected: {
    borderColor: "#000",
  },
  saveButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
