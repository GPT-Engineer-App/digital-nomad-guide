import { useState, useEffect } from "react";
import { Box, Container, Flex, Grid, Heading, Input, Text, VStack, Image, useBreakpointValue } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching city data:", error));
  }, []);

  const filteredCities = searchTerm ? cities.filter((city) => city.city.toLowerCase().includes(searchTerm.toLowerCase()) || city.country.toLowerCase().includes(searchTerm.toLowerCase())) : cities;

  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  });

  return (
    <Box>
      <Flex as="nav" bg="teal.500" color="white" padding={4} justifyContent="center" alignItems="center">
        <Heading as="h1" size="lg">
          NomadRank
        </Heading>
      </Flex>
      <VStack spacing={8} align="stretch" p={8}>
        <Box p={8} bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNofGVufDB8fHx8MTcxNTU0NjcxN3ww&ixlib=rb-4.0.3&q=80&w=1080" bgPosition="center" bgRepeat="no-repeat" bgSize="cover" color="white" textAlign="center">
          <Heading as="h2" size="xl">
            Discover the Best Cities for Digital Nomads
          </Heading>
          <Text fontSize="lg" mt={4}>
            Explore and rank cities based on digital nomad friendliness.
          </Text>
        </Box>
        <Box>
          <Flex mb={4} align="center">
            <Input placeholder="Search cities or countries" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size="lg" mr={2} />
            <FaSearch size="1.5em" />
          </Flex>
          <Grid templateColumns={gridTemplateColumns} gap={6}>
            {filteredCities.map((city) => (
              <Box key={city.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <Heading as="h3" size="md">
                  {city.city}
                </Heading>
                <Text>{city.country}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
