import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import { VideoSelect } from '~/store/videos';

const useVideosSelection = () => {
    const uncollectedVideos = useSelector((state: RootState) => state.videos.uncollectedVideos);

    const [videosToAddVideosModal, setVideosToAddVideosModal] = useState<VideoSelect[]>(() =>
        uncollectedVideos.map(({ id, url, thumbnail }) => ({ id, url, thumbnail, isSelected: false })),
    );

    useEffect(() => {
        setVideosToAddVideosModal(
            uncollectedVideos.map(({ id, url, thumbnail }) => ({ id, url, thumbnail, isSelected: false })),
        );
    }, [uncollectedVideos]);

    return { videosToAddVideosModal, setVideosToAddVideosModal };
};

export default useVideosSelection;
