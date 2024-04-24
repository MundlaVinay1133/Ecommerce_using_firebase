// Invoice.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const Invoice = ({ totalQty, totalPrice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Invoice Summary</Text>
        <Text style={styles.text}>Total No of Products: {totalQty}</Text>
        <Text style={styles.text}>Total Price to Pay: $ {totalPrice}</Text>
      </View>
    </Page>
  </Document>
);

export default Invoice;
