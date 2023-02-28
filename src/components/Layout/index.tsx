import { Flex } from '@chakra-ui/react';
import AvailableRecipients from '../AvailableRecipients';
import SelectedRecipients from '../SelectedRecipients';
import logo from '../../assets/logo.svg';
import RecipientsInput from '../RecipientsInput';

const Layout = () => (
  <Flex
    direction="column"
    justifyContent="start"
    alignItems="center"
    gap={10}
    pt={5}
    width="100vw"
    height="100vh"
    bgColor="gray.100"
  >
    <img src={logo} alt="Timescale" />
    <RecipientsInput />
    <Flex gap={80} alignItems="start">
      <AvailableRecipients />
      <SelectedRecipients />
    </Flex>
  </Flex>
);

export default Layout;
