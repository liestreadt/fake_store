import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { bucketStore } from '../../store/bucketStore';

export const BucketPage: FC = observer(() => {
    return (
        <main>
            <div>Sum - {bucketStore.bucketSumPrice}</div>
            <div>
                <div>Items in bucket</div>
                {bucketStore.cardsInBucket.map((card) => {
                    return (
                        <article key={card.id}>
                            <div>{card.title}</div>
                            <div>{card.description}</div>
                            <div>{card.price}</div>
                        </article>
                    );
                })}
            </div>
        </main>
    );
});
