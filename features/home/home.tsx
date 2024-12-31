import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { Video } from 'expo-av';  // Using the correct component from expo-av
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getAllPosts } from '@/hooks/usePosts';
import { VideoData } from '@/types/VideoData';

const { width, height } = Dimensions.get('window');



const mockData = async (): Promise<VideoData[]> => {
    const videoData = await getAllPosts();
    return videoData.map((el) => {
    return {
        id: el.id,
        user: el.user,
        videos: ["https://www.w3schools.com/html/mov_bbb.mp4"],
      }
})
}


const InstagramScroll: React.FC = () => {
  const [data, setData] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const videoData = await mockData();
      setData(videoData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const loadMoreVideos = () => {
    const newVideoData: VideoData = {
      id: `${data.length + 1}`,
      user: `User${data.length + 1}`,
      videos: ['https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/movie.mp4'],
    };
    setData((prevData) => [...prevData, newVideoData]);
  };

  const renderHorizontalVideos = useCallback(({ item }: { item: VideoData }) => {
    return (
      <FlatList
        data={item.videos}
        horizontal
        pagingEnabled
        keyExtractor={(videoUrl) => videoUrl}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: videoUrl }) => (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: videoUrl }}
              style={styles.video}
              resizeMode="cover"
              shouldPlay
              isLooping
            />
          </View>
        )}
      />
    );
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            {renderHorizontalVideos({ item })}
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  userVideosContainer: { 
    height: height-70,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
    height: '100%',
  },
});

export default InstagramScroll;
