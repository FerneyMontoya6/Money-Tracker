import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../navigation/types";

// Tipo de navegación para AlertsScreen
type AlertsScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "AlertsScreen"
>;

type Props = {
  navigation: AlertsScreenNavigationProp;
};

type Alerta = {
  id: string;
  nombre: string;
  monto: string;
  fecha: string;
  completado: boolean;
};

export default function AlertsScreen({ navigation }: Props) {
  const [alertas, setAlertas] = useState<Alerta[]>([
    {
      id: "1",
      nombre: "Factura Tigo",
      monto: "400,000",
      fecha: "23/08/24",
      completado: true,
    },
    {
      id: "2",
      nombre: "Arriendo",
      monto: "400,000",
      fecha: "23/08/24",
      completado: false,
    },
    {
      id: "3",
      nombre: "Factura EPM",
      monto: "400,000",
      fecha: "23/08/24",
      completado: false,
    },
  ]);

  const toggleCompletado = (id: string) => {
    setAlertas((prevAlertas) =>
      prevAlertas.map((alerta) =>
        alerta.id === id
          ? { ...alerta, completado: !alerta.completado }
          : alerta
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Alertas</Text>

      <FlatList
        data={alertas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alertItem}>
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.alertText,
                  item.completado && styles.completedText,
                ]}
              >
                {item.nombre}
              </Text>
              <Text style={styles.alertSubText}>{item.monto}</Text>
              <Text style={styles.alertSubText}>{item.fecha}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleCompletado(item.id)}>
              <Text style={styles.checkbox}>{item.completado ? "■" : "□"}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateAlertScreen")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  alertItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
  },
  alertText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#666",
  },
  alertSubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  checkbox: {
    fontSize: 24,
    color: "#000",
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
  },
});
