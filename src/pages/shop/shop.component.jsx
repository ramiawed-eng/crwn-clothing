import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from '../../firebase/firebase.util';

import { fetchColllectionsStart } from '../../redux/shop/shop.action';
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.components';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { updateCollections } from '../../redux/shop/shop.action';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// asynchronous component without redux-thunk

// class ShopPage extends React.Component {
//   state = { loading: true };
//   unsubscribeFromSnapshot = null;

//   componentDidMount() {
//     const { updateCollections } = this.props;
//     const collectionRef = firestore.collection('collections');

//     // use promise pattern
//     collectionRef.get().then((snapshot) => {
//       const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//       updateCollections(collectionsMap);
//       this.setState({ loading: false });
//     });

//     // user observable and observer pattern
//     // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
//     //   async (snapshot) => {
//     //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//     //     updateCollections(collectionsMap);
//     //     this.setState({ loading: false });
//     //   }
//     // );
//   }

//   render() {
//     const { match } = this.props;
//     const { loading } = this.state;
//     return (
//       <div className='shop-page'>
//         <Route
//           exact
//           path={`${match.path}`}
//           render={(props) => (
//             <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
//           )}
//         />
//         <Route
//           path={`${match.path}/:collectionId`}
//           render={(props) => (
//             <CollectionPageWithSpinner isLoading={loading} {...props} />
//           )}
//         />
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   updateCollections: (collectionsMap) =>
//     dispatch(updateCollections(collectionsMap)),
// });
// asynchronous component with redux-thunk
class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchColllectionsStart } = this.props;
    fetchColllectionsStart();
  }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionsLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchColllectionsStart: () => dispatch(fetchColllectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
