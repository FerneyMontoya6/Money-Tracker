import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

export default function HomeScreen({ navigation }) {
  const [saldo, setSaldo] = useState(0);
  const [nombre, setNombre] = useState("");
  const [movimientos, setMovimientos] = useState([]);

  // Obtener la información de la cuenta y sumar el saldo total de todas las cuentas
  const fetchUserInfo = async () => {
    const cuentasCollection = collection(db, "Cuentas");
    const cuentasSnapshot = await getDocs(cuentasCollection);
    const cuentasList = cuentasSnapshot.docs.map((doc) => doc.data());

    // Sumar los 'initialBalance' de todas las cuentas para obtener el saldo total
    const totalSaldo = cuentasList.reduce((total, cuenta) => total + cuenta.initialBalance, 0);
    setSaldo(totalSaldo);
  };

  // Obtener los movimientos y escuchar cambios en tiempo real
  const fetchMovimientos = () => {
    const movimientosCollection = collection(db, "Movimientos");
    onSnapshot(movimientosCollection, (snapshot) => {
      const movimientosList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovimientos(movimientosList);
    });
  };

  useEffect(() => {
    fetchUserInfo();
    fetchMovimientos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <MaterialIcons name="account-circle" size={50} color="#000" />
          <View style={styles.userInfo}>
            <Text style={styles.name}>Hola, {nombre}</Text>
            <Text style={styles.welcome}>Bienvenido nuevamente</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => navigation.navigate("AlertsScreen")}
        >
          <MaterialIcons name="notifications-none" size={30} color="#000" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Sección de saldo */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo Actual</Text>
        <Text style={styles.balance}>${saldo}</Text>
      </View>

      {/* Actividades recientes */}
      <View style={styles.activityHeader}>
        <Text style={styles.recentActivity}>Actividades Recientes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("ActivityRegister")}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.activityList}>
          {movimientos.length > 0 ? (
            movimientos.map((movimiento) => (
              <View style={styles.activityItem} key={movimiento.id}>
                <Text style={styles.activityText}>{movimiento.descripcion}</Text>
                <Text style={styles.activityDate}>{movimiento.fecha}</Text>
                <Text
                  style={[
                    styles.activityAmount,
                    movimiento.tipo === "Gasto" ? { color: "red" } : { color: "green" },
                  ]}
                >
                  {movimiento.tipo === "Gasto" ? "- $" : "+ $"}
                  {movimiento.valor}
                </Text>
              </View>
            ))
          ) : (
            <Text>No hay actividades recientes.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 14,
    color: "#777",
  },
  notificationIcon: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
  },
  balanceContainer: {
    backgroundColor: "#C4C4C4",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#fff",
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  recentActivity: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 50,
    padding: 8,
  },
  activityList: {
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  activityText: {
    fontSize: 16,
  },
  activityDate: {
    fontSize: 14,
    color: "#888",
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
