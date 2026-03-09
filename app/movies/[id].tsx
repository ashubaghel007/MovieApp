import { icons } from "@/constants/icons";
import moviesData from "@/data/movies.json";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ALL_MOVIES: Movie[] = moviesData as Movie[];

const GENRE_MAP: Record<number, string> = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
  80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
  14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
  9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
  53: "Thriller", 10752: "War", 37: "Western",
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const movie = ALL_MOVIES.find((m) => m.id === Number(id));

  if (!movie) {
    return (
      <SafeAreaView style={styles.notFound}>
        <Text style={styles.notFoundText}>Movie not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const posterUri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropUri = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
  const genres = movie.genre_ids.map((id) => GENRE_MAP[id]).filter(Boolean);
  const year = movie.release_date?.split("-")[0];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Backdrop */}
        <View style={styles.backdropContainer}>
          <Image source={{ uri: backdropUri }} style={styles.backdrop} resizeMode="cover" />
          {/* Gradient overlay */}
          <View style={styles.backdropOverlay} />

          {/* Back button */}
          <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backCircle}>
              <Image source={icons.arrow} style={styles.arrowIcon} tintColor="#FFFFFF" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Poster + Title row */}
          <View style={styles.posterRow}>
            <Image source={{ uri: posterUri }} style={styles.poster} resizeMode="cover" />
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{movie.title}</Text>
              {movie.original_title !== movie.title && (
                <Text style={styles.originalTitle}>{movie.original_title}</Text>
              )}

              {/* Rating */}
              <View style={styles.ratingRow}>
                <Image source={icons.star} style={styles.starIcon} tintColor="#FBBF24" />
                <Text style={styles.ratingValue}>
                  {movie.vote_average.toFixed(1)}
                </Text>
                <Text style={styles.voteCount}>({movie.vote_count.toLocaleString()})</Text>
              </View>

              {/* Year */}
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Year</Text>
                <Text style={styles.metaValue}>{year || "—"}</Text>
              </View>

              {/* Language */}
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Language</Text>
                <Text style={styles.metaValue}>
                  {movie.original_language.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          {/* Genres */}
          {genres.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Genres</Text>
              <View style={styles.genreRow}>
                {genres.map((g) => (
                  <View key={g} style={styles.genreChip}>
                    <Text style={styles.genreText}>{g}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Overview */}
          {movie.overview ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.overview}>{movie.overview}</Text>
            </View>
          ) : null}

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{movie.vote_average.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{Math.round(movie.popularity)}</Text>
              <Text style={styles.statLabel}>Popularity</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{movie.vote_count.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Votes</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#030014" },
  backdropContainer: { height: 260, position: "relative" },
  backdrop: { width: "100%", height: "100%" },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3,0,20,0.55)",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowIcon: { width: 18, height: 18, transform: [{ rotate: "180deg" }] },
  content: { padding: 20, paddingTop: 0 },
  posterRow: { flexDirection: "row", marginTop: -60, marginBottom: 24 },
  poster: {
    width: 110,
    height: 165,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1E1E2D",
  },
  titleBlock: { flex: 1, marginLeft: 16, paddingTop: 70 },
  title: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", marginBottom: 4 },
  originalTitle: { color: "#6B7280", fontSize: 12, marginBottom: 8 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  starIcon: { width: 14, height: 14, marginRight: 4 },
  ratingValue: { color: "#FBBF24", fontWeight: "700", fontSize: 14, marginRight: 4 },
  voteCount: { color: "#6B7280", fontSize: 11 },
  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  metaLabel: { color: "#6B7280", fontSize: 12, width: 70 },
  metaValue: { color: "#D1D5DB", fontSize: 12, fontWeight: "600" },
  section: { marginBottom: 24 },
  sectionTitle: {
    color: "#FFFFFF", fontSize: 16, fontWeight: "700", marginBottom: 10,
  },
  genreRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  genreChip: {
    backgroundColor: "#1E1E2D",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#2E2E3D",
  },
  genreText: { color: "#A78BFA", fontSize: 12, fontWeight: "600" },
  overview: { color: "#D1D5DB", fontSize: 14, lineHeight: 22 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 40 },
  statCard: {
    flex: 1,
    backgroundColor: "#1E1E2D",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2E2E3D",
  },
  statValue: { color: "#FFFFFF", fontSize: 20, fontWeight: "800" },
  statLabel: { color: "#6B7280", fontSize: 11, marginTop: 4 },
  notFound: { flex: 1, backgroundColor: "#030014", justifyContent: "center", alignItems: "center" },
  notFoundText: { color: "#FFFFFF", fontSize: 18, marginBottom: 20 },
  backBtn: { backgroundColor: "#A78BFA", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  backBtnText: { color: "#FFF", fontWeight: "700" },
});
