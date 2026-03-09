import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";
import moviesData from "@/data/movies.json";
import { FlatList, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DUMMY_MOVIES: Movie[] = moviesData as Movie[];

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={images.bg}
        style={styles.background}
        resizeMode="cover"
      >
        <FlatList
          data={DUMMY_MOVIES}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Popular Movies</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030014', // Fallback
  },
  background: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  header: {
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
