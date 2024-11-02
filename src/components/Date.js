import { getDayOfWeekFromTimestamp, getFormattedDateFromTimestamp } from '@/utils/helpers';
import React from 'react'

export default function Date(props) {
    const { data } = props;
    return (
        <h2 className="flex gap-1 text-2xl items-end">
            <p>
                {getDayOfWeekFromTimestamp(data.dt)}
            </p>
            <p className="text-lg">
                ({getFormattedDateFromTimestamp(data.dt)})
            </p>
        </h2>
    )
}
