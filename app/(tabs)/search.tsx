import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import moviesData from "@/data/movies.json";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ALL_MOVIES: Movie[] = moviesData as Movie[];

export default function Search() {
  const [query, setQuery] = useState("");

  const filteredMovies = useMemo(() => {
    if (!query.trim()) return [];
    return ALL_MOVIES.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={images.bg}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchBar}>
            <Image source={icons.search} style={styles.searchIcon} tintColor="#A0A0B0" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search movies..."
              placeholderTextColor="#A0A0B0"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              clearButtonMode="while-editing"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Results */}
        {!query.trim() ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>Search for a movie</Text>
            <Text style={styles.emptySubtitle}>Type a title to get started</Text>
          </View>
        ) : filteredMovies.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎬</Text>
            <Text style={styles.emptyTitle}>No movies found</Text>
            <Text style={styles.emptySubtitle}>Try a different search term</Text>
          </View>
        ) : (
          <FlatList
            data={filteredMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard movie={item} />}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.columnWrapper}
            ListHeaderComponent={
              <Text style={styles.resultsLabel}>
                {filteredMovies.length}{" "}
                {filteredMovies.length === 1 ? "result" : "results"} for "{query}"
              </Text>
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030014",
  },
  background: {
    flex: 1,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    padding: 0,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  resultsLabel: {
    color: "#9CA3AF",
    fontSize: 13,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptySubtitle: {
    color: "#6B7280",
    fontSize: 14,
  },
});
