import React from "react";
import "./listitem.scss";
import { SortableElement } from "react-sortable-hoc";

const ListItem = ({
  images = [],
  hideColZero,
  first,
  second,
  third,
  renderChoices,
  modifier = "normal",
}) => (
  <div className={`list-container ${modifier}`}>
    {!hideColZero && (
      <div className={`list-section ${modifier} col0`}>
        {modifier === "heading" ? (
          ""
        ) : images.length > 0 ? (
          <img
            className="list-image"
            src={`${images[0].url}`}
            alt="Playlist Picture"
          />
        ) : (
          ""
        )}
      </div>
    )}

    <div className={`list-section ${modifier} col1`}>{first}</div>

    <div className={`list-section ${modifier} col2`}>{second}</div>

    <div className={`list-section ${modifier} col3`}>{third}</div>

    {renderChoices && renderChoices()}
  </div>
);

const SelectableListItemSmall = ({ first, second, third, renderChoices }) => (
  <li className="selectable-list-container-small">
    {first && <div className="selectable-name">{first}</div>}
    {second && <div className="selectable-artist">{second}</div>}
    {renderChoices && <div className="selectable-check">{renderChoices()}</div>}
  </li>
);

const SortableItem = SortableElement(ListItem);

export { ListItem, SortableItem, SelectableListItemSmall };
