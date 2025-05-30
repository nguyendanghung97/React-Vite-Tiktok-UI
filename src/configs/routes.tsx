const routes: Record<string, any> = {
    profile: (username: string) => `/profile/${username}`,
    myCollection: (id: string) => `/profile/@dhung61097/collection/${id}`,
    home: '/',
    homeShowComment: '/:nickname/video/:id',
    following: '/following',
    myProfile: '/profile/@dhung61097',
    upload: '/upload',
    search: '/search',
    explore: '/explore',
    live: '/live',
    friends: '/friends',
    setting: '/setting',
    coin: '/coin',
    feedback: '/feedback',
    analytics: '/analytics/overview',
    creators: '/live/creators',
};

export default routes;
