import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AccountCard } from "../components/AccountCard";
import { accounts } from "../utils/mock";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountsStackParamList } from "src/navigation/types";

// Definir el tipo de las props de navegación
type AccountsScreenNavigationProp = StackNavigationProp<
  AccountsStackParamList,
  "AccountsScreen"
>;

// Definir las props del componente
type Props = {
  navigation: AccountsScreenNavigationProp;
};

export default function AccountScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cuentas</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AccountsScreen")}
        >
          <Text>Agregar Cuenta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.accountsWrapper}>
        {accounts.length === 0 ? (
          <Text>No hay cuentas registradas</Text>
        ) : (
          accounts.map((account, index) => (
            <AccountCard
              key={account.id}
              index={index + 1}
              name={account.name}
              type={account.type}
              balance={account.balance}
            />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    fontWeight: "semibold",
    borderWidth: 1,
    borderColor: "#000",
  },
  accountsWrapper: {
    paddingVertical: 20,
    rowGap: 20,
  },
});
