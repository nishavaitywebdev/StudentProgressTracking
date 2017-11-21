/**
 * Created by nishavaity on 10/21/17.
 */
import * as types from '../../src/constants/ActionTypes';
const initialState = {
    projects: null,
    project: null,
    filterText: '',
    topicFilter: '',
    termFilter: ''
}

export default function projects(state = initialState, action) {
    let currProjects = state.projectById;
    switch (action.type) {
        case types.ADD_PROJECT:
            return { ...state, status:'adding project', error:null, loading: true};
        case types.ADD_PROJECT_SUCCESS:
            return { ...state, status:'added', error:null, loading: false}; //<-- authenticated
        case types.ADD_PROJECT_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, status:'oops', error:error, loading: false};

        case types.EDIT_PROJECT:
            return { ...state, status:'editing project', error:null, loading: true};
        case types.EDIT_PROJECT_SUCCESS:
            return { ...state, project: action.project, status:'edited', error:null, loading: false}; //<-- authenticated
        case types.EDIT_PROJECT_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, user: null, status:'oops', error:error, loading: false};

        case types.UPLOAD_DESC_FILE:
            return { ...state, status:'editing project', error:null, loading: true};
        case types.UPLOAD_DESC_FILE_SUCCESS:
            return { ...state, project: action.project, status:'edited', error:null, loading: false}; //<-- authenticated
        case types.EUPLOAD_DESC_FILE_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, user: null, status:'oops', error:error, loading: false};

        case types.GET_PROJECTS:
            return { ...state, status:'fetching', error:null, loading: true};
        case types.GET_PROJECTS_SUCCESS:
            return { ...state, projects: action.payload, status:'got it', error:null, loading: false}; //<-- authenticated
        case types.GET_PROJECTS_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, courses: null, status:'error', error:error, loading: false};

        case types.GET_PROJECT_DETAILS:
            return { ...state, status:'fetching', error:null, loading: true};
        case types.GET_PROJECT_DETAILS_SUCCESS:
            return { ...state, project: action.payload, status:'got it', error:null, loading: false}; //<-- authenticated
        case types.GET_PROJECT_DETAILS_FAIL:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, courses: null, status:'error', error:error, loading: false};

        case types.DELETE_PROJECT:
            const projectId = action.pId;
            let deletedProjects = currProjects.filter(project => project.id != projectId);
            return {
                projects: state.projects,
                projectById: deletedProjects,
                filterText: state.filterText,
                topicFilter: state.topicFilter,
                termFilter: state.termFilter,
            }

        case types.ADD_PREFERREDBY:
            return { ...state, status:'adding pref by', error:null, loading: true};
        case types.ADD_PREFERREDBY_SUCCESS:
            return { ...state, status:'updated project', error:null, loading: false}; //<-- authenticated
        case types.ADD_PREFERREDBY_FAILURE:// return error and make loading = false
            error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, user: null, status:'oops', error:error, loading: false};

        case types.FILTER_PROJECT:
            const searchText = action.searchText === undefined ? state.filterText: action.searchText;
            const topic = action.payload === undefined ? state.topicFilter: action.payload.topic;
            const term = action.payload === undefined ? state.termFilter: action.payload.term;
            return {
                projects: state.projects,
                projectById: state.projectById,
                filterText: searchText,
                topicFilter: topic,
                termFilter: term,
            }
        default:
            return state;
    }
}