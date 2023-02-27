import { ChakraProvider } from '@chakra-ui/react';
import { RecipientsContext } from './context';
import Layout from './components/Layout';

const App = () => (
  <ChakraProvider>
    <RecipientsContext>
      <Layout />
    </RecipientsContext>
  </ChakraProvider>
);

export default App;
