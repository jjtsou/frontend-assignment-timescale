import { ChakraProvider } from '@chakra-ui/react';
import { useRecipients } from './hooks';
import { RecipientsContext } from './context';
import Layout from './components/Layout';

const App = () => {
  const {
    recipients,
    selectedDomains,
    getGroupedRecipients,
    selectRecipient,
    selectDomain,
  } = useRecipients();

  return (
    <ChakraProvider>
      <RecipientsContext.Provider
        value={{
          recipients,
          selectedDomains,
          getGroupedRecipients,
          selectRecipient,
          selectDomain,
        }}
      >
        <Layout />
      </RecipientsContext.Provider>
    </ChakraProvider>
  );
};

export default App;
