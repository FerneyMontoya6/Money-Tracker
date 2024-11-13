import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <MaterialIcons name="account-circle" size={50} color="#000" />
          <View style={styles.userInfo}>
            <Text style={styles.name}>Hola, Juan</Text>
            <Text style={styles.welcome}>Bienvenido nuevamente</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate('AlertsScreen')} >
          <MaterialIcons name="notifications-none" size={30} color="#000" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Sección de saldo */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo Actual</Text>
        <Text style={styles.balance}>$3,000,000</Text>
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
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Tiendas D1</Text>
            <Text style={styles.activityDate}>18/08/24</Text>
            <Text style={styles.activityAmount}>- $40,000</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>ETF</Text>
            <Text style={styles.activityDate}>17/08/24</Text>
            <Text style={styles.activityAmount}>+ $80,000</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Recibos</Text>
            <Text style={styles.activityDate}>17/08/24</Text>
            <Text style={styles.activityAmount}>- $130,000</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Ventas</Text>
            <Text style={styles.activityDate}>16/08/24</Text>
            <Text style={styles.activityAmount}>+ $300,000</Text>
          </View>
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});
