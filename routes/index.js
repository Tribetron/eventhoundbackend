exports.create_user = '/api/user';
exports.edit_user = '/users/edit';
exports.single_user = '/users/single';
exports.login_user = '/api/login';
exports.list_users = '/users/list';
exports.delete_account = '/users/delete';
exports.forgot_password = '/users/password-forgot';
exports.google_login = '/users/login/google';
exports.facebook_login = '/users/login/facebook';

exports.create_venue = '/venue/create';
exports.create_venue_step_one = '/api/firstStep';
exports.create_venue_step_two = '/auth/secondStep';
exports.create_venue_step_three = '/auth/thirdStep';
exports.create_venue_step_four = '/auth/fourthStep';
exports.create_venue_step_five = '/auth/fifthStep';
exports.create_venue_step_six = '/auth/sixthStep';
exports.create_venue_step_seven = '/auth/seventhStep';
exports.create_venue_step_eight = '/auth/eightStep';
exports.create_venue_step_nine = '/venue/create-step-nine';
exports.create_venue_contract = "/auth/placeContract";
exports.list_venue_menus = '/auth/getMenuList'
exports.list_venue_contracts = '/auth/getContractList'
exports.list_venue_details = '/auth/getVenueDetail'



exports.get_featured_places = '/api/getFeaturePlaces';
exports.get_last_minute_deals_places = '/api/getLastMinuteDealPlaces';
exports.get_venue_features = '/api/getFeatureList';



exports.get_room_details = '/api/getRoomDetails'
exports.get_room_pricing = '/auth/getRoomPricing'
exports.update_room_pricing = '/auth/updateRoomPricing'
exports.add_favourite_place = '/auth/addFavourite'





exports.edit_venue = '/venue/edit';
exports.list_venues = '/venue/list';
exports.list_single_venue = '/venue/single';
exports.search_venue = '/venue/search';
// book venue takes parameters, (manual confirmation, auto confirmation, with email notifcations based on confirmation method);
exports.book_venue = '/venue/book';
exports.delete_venue = '/venue/delete';


exports.process_payment = '/payments/process';
exports.list_payment = '/payments/single';

exports.help = '/help/search';


