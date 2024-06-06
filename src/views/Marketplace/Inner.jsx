import { memo, useState } from 'react';
import Collections from './components/Collections';
import Collection from './components/Collection';
const Inner = memo(() => {
    const [noCollection, setNoCollection] = useState(-1);

    return (
        <>
            {noCollection===-1&&
                <Collections setNoCollection={setNoCollection}/>
            }
            {noCollection>=0&&noCollection<=11&&
                <div>
                    <Collection setNoCollection={setNoCollection} index={noCollection}/>
                </div>
            }
            {noCollection<-1&&noCollection>11&&
                <div>

                </div>
            }
        </>
    );
});

Inner.displayName = 'Marketplace Inner';

export default Inner;
