import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomTextInput } from "../components/Input";
import { SelectInput } from "../components/SelectInput";
import { bankingEntities, typesOfAccounts } from "../utils/constants";
import { useState } from "react";
import { DateInput } from "../components/DateInput";

export default function CreateAccountScreen() {
  const [selectedBankingEntity, setSelectedBankingEntity] = useState(
    bankingEntities[0].value
  );
  const [selectedTypeOfAccount, setSelectedTypeOfAccount] = useState(
    typesOfAccounts[0].value
  );
  const [date, setDate] = useState(new Date());

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
            onValueChange={(event) => {
              setSelectedBankingEntity(event);
            }}
          />
          <SelectInput
            label="Tipo de cuenta"
            options={typesOfAccounts}
            selectedValue={selectedTypeOfAccount}
            onValueChange={(event) => {
              setSelectedTypeOfAccount(event);
            }}
          />
          <DateInput date={date} setDate={setDate} />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: "semibold",
            }}
          >
            Crear cuenta
          </Text>
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
  form: {
    paddingVertical: 30,
  },
});
