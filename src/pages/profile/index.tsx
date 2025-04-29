import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import config from '~/configs';
import InfoAccount from '~/pages/profile/infoAccount';
import NameCollectionModal from '~/components/modal/forms/nameCollection';
import AddVideosModal from '~/components/modal/forms/addVideos';
import { addCollection, ICollection } from '~/store/collections';
import { reduceUncollectedVideos, VideoSelect } from '~/store/videos';
import useVideosSelection from '~/hooks/useVideosSelection';
import VideoTabPanel from './videoTabPanel';

import './index.less';

const Profile = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Sử dụng để điều hướng

    const { videosToAddVideosModal, setVideosToAddVideosModal } = useVideosSelection();

    const [activeModalIndex, setActiveModalIndex] = useState<number>(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const { selectedAccount, myCollectionRedirectTab, myCollectionRedirectSubTab } = useMemo(() => {
        // console.log('selectedAccount');
        return state || {};
    }, [state]);

    const selectedVideos: VideoSelect[] = useMemo(() => {
        return videosToAddVideosModal.filter((video) => video.isSelected);
    }, [videosToAddVideosModal]);

    // const { username } = useParams<{ username: string }>();
    // // console.log('username', username);
    // useEffect(() => {
    //     if (selectedAccount) {
    //         document.title = `${selectedAccount.full_name} (${username})`;
    //     } else {
    //         document.title = `(17)Đăng Hùng (${username})`;
    //     }
    // }, [username, selectedAccount]);

    const handleOpenModal = useCallback(() => {
        setIsOpenModal(true);
    }, []);

    const handleCloseModal = () => {
        setVideosToAddVideosModal((prev) => prev.map((video) => ({ ...video, isSelected: false })));
        setIsChecked(false);
        setCollectionName('');
        setIsOpenModal(false);
        // setSelectedVideos([]);
        setActiveModalIndex(0);
    };

    const handleNext = () => {
        setActiveModalIndex((prevIndex) => prevIndex + 1); // Chuyển sang modal tiếp theo
    };
    const handleBackModal = () => {
        setActiveModalIndex((prev) => prev - 1); // Trở về modal trước đó
    };

    // chỉ tạo function mới nếu một trong các dependency (selectedVideos, collectionName, isChecked, dispatch, navigate) thay đổi.
    const handleSubmitAddVideosModal = useCallback(() => {
        // e.preventDefault();
        // handleCloseModal();

        const collectionId = uuidv4();
        // Lọc chỉ lấy id và video từ selectedVideos
        const collectionVideos = selectedVideos.map(({ id, url, thumbnail }) => ({ id, url, thumbnail }));

        // Logic cho profile
        const newCollection: ICollection = {
            id: collectionId,
            collectionName: collectionName,
            collectionVideos: collectionVideos,
            isPublic: isChecked,
        };

        dispatch(addCollection(newCollection));
        navigate(`${config.routes.myProfile}/collection/${collectionId}`);

        // dispatch(setVideos(videosToAdd));
        dispatch(reduceUncollectedVideos(selectedVideos));
    }, [selectedVideos, collectionName, isChecked, dispatch, navigate]);

    const renderModal = () => {
        if (!isOpenModal) return null;

        switch (activeModalIndex) {
            case 0:
                return (
                    <NameCollectionModal
                        showPublicToggle
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        isOpenModal={isOpenModal}
                        setIsOpenModal={setIsOpenModal}
                        collectionName={collectionName}
                        setCollectionName={setCollectionName}
                        handleCloseModal={handleCloseModal}
                        handleNext={handleNext}
                    />
                );
            case 1:
                return (
                    <AddVideosModal
                        context="profile"
                        videosToAddVideosModal={videosToAddVideosModal}
                        setVideosToAddVideosModal={setVideosToAddVideosModal}
                        isOpenModal={isOpenModal}
                        selectedVideos={selectedVideos}
                        // setSelectedVideos={setSelectedVideos}
                        handleBackModal={handleBackModal}
                        handleCloseModal={handleCloseModal}
                        handleSubmit={handleSubmitAddVideosModal}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            {console.log('re-renderProfile')}
            {/* Nguyên nhân dẫn đến UI bị rung:
            Trình duyệt không biết vùng nào được phép cuộn tiếp, nên sự kiện wheel bị đẩy lên phần tử cha (body, html, hoặc page).
            Nếu phần tử con (sidebar) đã cuộn hết, trình duyệt mặc định chuyển cuộn sang phần tử cha → gây hiệu ứng giật/rung khi page cũng bắt đầu cuộn.
            
        */}
            {isOpenModal && renderModal()}

            {/* 100dvh là 100% chiều cao thực tế của thiết bị, không bị ảnh hưởng bởi thanh địa chỉ của trình duyệt. */}
            <div className="py-9 px-8 flex-1 overflow-x-hidden overflow-y-scroll sm:h-[calc(100dvh-4rem)]">
                <InfoAccount account={selectedAccount}></InfoAccount>

                <VideoTabPanel
                    handleOpenModal={handleOpenModal}
                    myCollectionRedirectSubTab={myCollectionRedirectSubTab}
                    myCollectionRedirectTab={myCollectionRedirectTab}
                    selectedAccount={selectedAccount}
                />
            </div>
        </>
    );
};

export default Profile;
