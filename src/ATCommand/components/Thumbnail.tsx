import React, { FC } from 'react'

type ThumbnailProps = {
  url: string
  isVideo?: boolean
  selected?: boolean
  onClick: () => void
}

export const Thumbnail: FC<ThumbnailProps> = ({
  url, isVideo, selected,
  onClick
}) => {
  return !isVideo
    ? (
      <img
        alt={''}
        key={url}
        className={ `${selected && 'border-gray-300'}` }
        src={url}
        width={64}
        onClick={onClick} />
    )
    : (
      <div
        className={`border text-xs w-14 cursor-pointer ${selected && 'border-gray-300'}`}
        onClick={onClick}
      >Click to view video</div>
    )
}
