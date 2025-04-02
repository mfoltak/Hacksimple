import { TrustFundData } from '../types/trust';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  heading: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  field: {
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});

const TrustDocument = ({ data }: { data: TrustFundData }) => (
  <Document>
   <Page size="A4" style={styles.page}>
      <View style={styles.title}>
        <Text>TRUST DEED</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>1. SETTLOR INFORMATION</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Full Name: </Text>
          <Text>{data.settlor.fullName}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Date of Birth: </Text>
          <Text>{format(new Date(data.settlor.dateOfBirth), 'MMMM dd, yyyy')}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Address: </Text>
          <Text>{data.settlor.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>2. TRUSTEE INFORMATION</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Full Name: </Text>
          <Text>{data.trustee.fullName}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Date of Birth: </Text>
          <Text>{format(new Date(data.trustee.dateOfBirth), 'MMMM dd, yyyy')}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Address: </Text>
          <Text>{data.trustee.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>3. BENEFICIARIES</Text>
        {data.beneficiaries.map((beneficiary, index) => (
          <View key={index} style={styles.field}>
            <Text style={styles.label}>Beneficiary {index + 1}</Text>
            <Text>Name: {beneficiary.fullName}</Text>
            <Text>Relationship: {beneficiary.relationship}</Text>
            <Text>Distribution Instructions: {beneficiary.distributionInstructions}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>4. TRUST DETAILS</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Trust Name: </Text>
          <Text>{data.trustDetails.name}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Type: </Text>
          <Text>{data.trustDetails.type}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Purpose: </Text>
          <Text>{data.trustDetails.purpose}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>DECLARATIONS</Text>
        <Text>
          This trust deed is made on {format(new Date(), 'MMMM dd, yyyy')} between the Settlor and the Trustee(s).
          The Settlor hereby declares their intention to create a trust and transfers the initial trust property
          to the Trustee(s) to hold upon the trusts declared in this deed.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>SIGNATURES</Text>
        <View style={styles.field}>
          <Text>Settlor: _________________________</Text>
          <Text>Date: {format(new Date(), 'MMMM dd, yyyy')}</Text>
        </View>
        <View style={styles.field}>
          <Text>Trustee: _________________________</Text>
          <Text>Date: {format(new Date(), 'MMMM dd, yyyy')}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export const generateTrustDocument = async (data: TrustFundData) => {
  const blob = await pdf(<TrustDocument data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.trustDetails.name || 'trust-deed'}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};