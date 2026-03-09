import { useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { icons } from '@/constants/icons';

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
}

const MovieCard = ({ movie, onPress }: MovieCardProps) => {
  const router = useRouter();
  const handlePress = onPress ?? (() => router.push(`/movies/${movie.id}`));
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8} style={styles.card}>
      <Image
        source={{ uri: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750' }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Image source={icons.star} style={styles.starIcon} tintColor="#FBBF24" />
          <Text style={styles.ratingText}>
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </Text>
          <Text style={styles.yearText}>
            • {movie.release_date?.split('-')[0] || 'Unknown'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    backgroundColor: '#1E1E2D', // Dark premium background
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  poster: {
    width: '100%',
    aspectRatio: 2/3,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  ratingText: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 6,
  },
  yearText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});

export default MovieCard;
