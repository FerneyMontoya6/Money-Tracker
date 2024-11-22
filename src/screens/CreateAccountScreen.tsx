import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomTextInput } from "../components/Input";
import { SelectInput } from "../components/SelectInput";
import { DateInput } from "../components/DateInput";
import { bankingEntities, typesOfAccounts } from "../utils/constants";

// Tipos de las opciones de SelectInput
type Option = {
  label: string;
  value: string;
};

export default function CreateAccountScreen() {
  // Estados tipados
  const [selectedBankingEntity, setSelectedBankingEntity] = useState<string>(
    bankingEntities[0].value
  );
  const [selectedTypeOfAccount, setSelectedTypeOfAccount] = useState<string>(
    typesOfAccounts[0].value
  );
  const [date, setDate] = useState<Date>(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <View
        style={{ paddingBottom: 40, flex: 1, justifyContent: "space-between" }}
      >
        <View style={styles.form}>
          <CustomTextInput placeholder="Nequi" label="Nombre de la cuenta" />
          <CustomTextInput placeholder="Para ahorros" label="Descripción" />
          <CustomTextInput placeholder="10000" label="Saldo inicial" />
          <SelectInput
            label="Entidad Bancaria"
            options={bankingEntities}
            selectedValue={selectedBankingEntity}
            onValueChange={(value) => setSelectedBankingEntity(value)}
          />
          <SelectInput
            label="Tipo de cuenta"
            options={typesOfAccounts}
            selectedValue={selectedTypeOfAccount}
            onValueChange={(value) => setSelectedTypeOfAccount(value)}
          />
          <DateInput date={date} setDate={setDate} />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  form: {
    paddingVertical: 30,
  },
});
