import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, Button } from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface VideoData {
  id: string;
  user: string;
  videos: string[];
}

const SingleVideo: React.FC<{ videoUrl: string; isActive: boolean }> = ({ videoUrl, isActive }) => {
  const player = useVideoPlayer(videoUrl, player => {
    player.loop = true;
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View style={styles.videoContainer}>
      <VideoView 
        style={styles.video} 
        player={player} 
        allowsFullscreen 
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
};

const HorizontalVideoList: React.FC<{ item: VideoData; activeVideoIndex: number }> = ({ item, activeVideoIndex }) => {
  return (
    <FlatList
      data={item.videos}
      horizontal
      pagingEnabled
      keyExtractor={(videoUrl) => videoUrl}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: videoUrl, index }) => (
        <SingleVideo videoUrl={videoUrl} isActive={index === activeVideoIndex} />
      )}
    />
  );
};

const Home: React.FC = () => {
  const [data, setData] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const videoData = await response.json();
        setData(videoData);
      } catch (error) {
        // Fallback to mock data if API fails
        const mockVideoData = [
          {
            id: '1',
            user: 'User1',
            videos: [
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
            ],
          },
        ];
        setData(mockVideoData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMoreVideos = useCallback(() => {
    const newVideoData: VideoData = {
      id: `${data.length + 1}`,
      user: `User${data.length + 1}`,
      videos: [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      ],
    };
    setData(prevData => [...prevData, newVideoData]);
  }, [data.length]);

  const handleScroll = useCallback((event: any) => {
    const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    setActiveVideoIndex(newIndex);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          pagingEnabled
          onEndReached={loadMoreVideos}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.userVideosContainer}>
              <Text style={styles.username}>{item.user}</Text>
              <HorizontalVideoList 
                item={item} 
                activeVideoIndex={activeVideoIndex} 
              />
            </View>
          )}
          onMomentumScrollEnd={handleScroll}
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userVideosContainer: {
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  username: {
    position: 'absolute',
    top: 40,
    left: 20,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 10,
  },
  videoContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: width,
    height: height - 100,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  }
});

export default Home;