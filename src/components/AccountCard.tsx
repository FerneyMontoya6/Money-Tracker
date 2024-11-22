import { View, Text, StyleSheet } from "react-native";
import { formatToCurrency } from "../utils/functions";

interface AccountCardProps {
  index: number;
  name: string;
  type: string;
  balance: number;
}

const AccountCard = ({ index, name, type, balance }: AccountCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.header}>Cuenta {index}</Text>
      <View
        style={{
          padding: 20,
        }}
      >
        <Text style={styles.bankName}>{name}</Text>
        <Text style={styles.accountType}>{type}</Text>
        <Text style={styles.balance}>{formatToCurrency(balance)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    // Sombra en iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Sombra en Android
    elevation: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#000",
    padding: 10,
    textAlign: "center",
  },
  bankName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  accountType: {
    color: "#000", // Opcional: Puedes definir el color que desees
  },
  balance: {
    fontWeight: "bold",
    fontSize: 32,
    marginTop: 10,
  },
});

export { AccountCard };
