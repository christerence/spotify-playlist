import React from "react";
import "./listitem.scss";
import { SortableElement } from "react-sortable-hoc";

const ListItem = ({ first, second, third, renderChoices }) => (
  <div className="list-container">
    <div className="list-section">{first}</div>

    <div className="list-section">{second}</div>

    <div className="list-section">{third}</div>

    {renderChoices && <div className="list-section">{renderChoices()}</div>}
  </div>
);

const ListItemSmall = ({ first, second, third, renderChoices }) => (
  <li className="list-container-small">
    {first && <div className="list-section-small">{first}</div>}

    {second && <div className="list-section-small">{second}</div>}

    {third && <div className="list-section-small">{third}</div>}

    {renderChoices && (
      <div className="list-section-small">{renderChoices()}</div>
    )}
  </li>
);

const SelectableListItemSmall = ({ first, second, third, renderChoices }) => (
  <li className="selectable-list-container-small">
    {first && <div className="selectable-name">{first}</div>}
    {second && <div className="selectable-artist">{second}</div>}
    {renderChoices && (
      <div className="selectable-check">{renderChoices()}</div>
    )}
  </li>
);

const SortableItem = SortableElement(ListItemSmall);

export { ListItem, ListItemSmall, SortableItem, SelectableListItemSmall };
