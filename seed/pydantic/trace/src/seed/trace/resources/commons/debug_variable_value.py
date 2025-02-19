# This file was auto-generated by Fern from our API Definition.

from __future__ import annotations

import datetime as dt
import typing

from ...core.datetime_utils import serialize_datetime
from ...core.pydantic_utilities import deep_union_pydantic_dicts, pydantic_v1
from .binary_tree_node_and_tree_value import BinaryTreeNodeAndTreeValue
from .binary_tree_node_value import BinaryTreeNodeValue
from .binary_tree_value import BinaryTreeValue
from .doubly_linked_list_node_and_list_value import DoublyLinkedListNodeAndListValue
from .doubly_linked_list_node_value import DoublyLinkedListNodeValue
from .doubly_linked_list_value import DoublyLinkedListValue
from .generic_value import GenericValue
from .node_id import NodeId
from .singly_linked_list_node_and_list_value import SinglyLinkedListNodeAndListValue
from .singly_linked_list_node_value import SinglyLinkedListNodeValue
from .singly_linked_list_value import SinglyLinkedListValue


class DebugVariableValue_IntegerValue(pydantic_v1.BaseModel):
    value: int
    type: typing.Literal["integerValue"] = "integerValue"


class DebugVariableValue_BooleanValue(pydantic_v1.BaseModel):
    value: bool
    type: typing.Literal["booleanValue"] = "booleanValue"


class DebugVariableValue_DoubleValue(pydantic_v1.BaseModel):
    value: float
    type: typing.Literal["doubleValue"] = "doubleValue"


class DebugVariableValue_StringValue(pydantic_v1.BaseModel):
    value: str
    type: typing.Literal["stringValue"] = "stringValue"


class DebugVariableValue_CharValue(pydantic_v1.BaseModel):
    value: str
    type: typing.Literal["charValue"] = "charValue"


class DebugVariableValue_MapValue(pydantic_v1.BaseModel):
    key_value_pairs: typing.List[DebugKeyValuePairs] = pydantic_v1.Field(alias="keyValuePairs")
    type: typing.Literal["mapValue"] = "mapValue"

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults_exclude_unset: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        kwargs_with_defaults_exclude_none: typing.Any = {"by_alias": True, "exclude_none": True, **kwargs}

        return deep_union_pydantic_dicts(
            super().dict(**kwargs_with_defaults_exclude_unset), super().dict(**kwargs_with_defaults_exclude_none)
        )

    class Config:
        allow_population_by_field_name = True
        populate_by_name = True
        extra = pydantic_v1.Extra.allow
        json_encoders = {dt.datetime: serialize_datetime}


class DebugVariableValue_ListValue(pydantic_v1.BaseModel):
    value: typing.List[DebugVariableValue]
    type: typing.Literal["listValue"] = "listValue"


class DebugVariableValue_BinaryTreeNodeValue(pydantic_v1.BaseModel):
    node_id: NodeId = pydantic_v1.Field(alias="nodeId")
    full_tree: BinaryTreeValue = pydantic_v1.Field(alias="fullTree")
    type: typing.Literal["binaryTreeNodeValue"] = "binaryTreeNodeValue"

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults_exclude_unset: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        kwargs_with_defaults_exclude_none: typing.Any = {"by_alias": True, "exclude_none": True, **kwargs}

        return deep_union_pydantic_dicts(
            super().dict(**kwargs_with_defaults_exclude_unset), super().dict(**kwargs_with_defaults_exclude_none)
        )

    class Config:
        allow_population_by_field_name = True
        populate_by_name = True
        extra = pydantic_v1.Extra.allow
        json_encoders = {dt.datetime: serialize_datetime}


class DebugVariableValue_SinglyLinkedListNodeValue(pydantic_v1.BaseModel):
    node_id: NodeId = pydantic_v1.Field(alias="nodeId")
    full_list: SinglyLinkedListValue = pydantic_v1.Field(alias="fullList")
    type: typing.Literal["singlyLinkedListNodeValue"] = "singlyLinkedListNodeValue"

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults_exclude_unset: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        kwargs_with_defaults_exclude_none: typing.Any = {"by_alias": True, "exclude_none": True, **kwargs}

        return deep_union_pydantic_dicts(
            super().dict(**kwargs_with_defaults_exclude_unset), super().dict(**kwargs_with_defaults_exclude_none)
        )

    class Config:
        allow_population_by_field_name = True
        populate_by_name = True
        extra = pydantic_v1.Extra.allow
        json_encoders = {dt.datetime: serialize_datetime}


class DebugVariableValue_DoublyLinkedListNodeValue(pydantic_v1.BaseModel):
    node_id: NodeId = pydantic_v1.Field(alias="nodeId")
    full_list: DoublyLinkedListValue = pydantic_v1.Field(alias="fullList")
    type: typing.Literal["doublyLinkedListNodeValue"] = "doublyLinkedListNodeValue"

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults_exclude_unset: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        kwargs_with_defaults_exclude_none: typing.Any = {"by_alias": True, "exclude_none": True, **kwargs}

        return deep_union_pydantic_dicts(
            super().dict(**kwargs_with_defaults_exclude_unset), super().dict(**kwargs_with_defaults_exclude_none)
        )

    class Config:
        allow_population_by_field_name = True
        populate_by_name = True
        extra = pydantic_v1.Extra.allow
        json_encoders = {dt.datetime: serialize_datetime}


class DebugVariableValue_UndefinedValue(pydantic_v1.BaseModel):
    type: typing.Literal["undefinedValue"] = "undefinedValue"

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults_exclude_unset: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        kwargs_with_defaults_exclude_none: typing.Any = {"by_alias": True, "exclude_none": True, **kwargs}

        return deep_union_pydantic_dicts(
            super().dict(**kwargs_with_defaults_exclude_unset), super().dict(**kwargs_with_defaults_exclude_none)
        )

    class Config:
        extra = pydantic_v1.Extra.allow
        json_encoders = {dt.datetime: serialize_datetime}


class DebugVariableValue_NullValue(pydantic_v1.BaseModel):
    type: typing.Literal["nullValue"] = "nullValue"

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults_exclude_unset: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        kwargs_with_defaults_exclude_none: typing.Any = {"by_alias": True, "exclude_none": True, **kwargs}

        return deep_union_pydantic_dicts(
            super().dict(**kwargs_with_defaults_exclude_unset), super().dict(**kwargs_with_defaults_exclude_none)
        )

    class Config:
        extra = pydantic_v1.Extra.allow
        json_encoders = {dt.datetime: serialize_datetime}


class DebugVariableValue_GenericValue(pydantic_v1.BaseModel):
    stringified_type: typing.Optional[str] = pydantic_v1.Field(alias="stringifiedType", default=None)
    stringified_value: str = pydantic_v1.Field(alias="stringifiedValue")
    type: typing.Literal["genericValue"] = "genericValue"

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults_exclude_unset: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        kwargs_with_defaults_exclude_none: typing.Any = {"by_alias": True, "exclude_none": True, **kwargs}

        return deep_union_pydantic_dicts(
            super().dict(**kwargs_with_defaults_exclude_unset), super().dict(**kwargs_with_defaults_exclude_none)
        )

    class Config:
        allow_population_by_field_name = True
        populate_by_name = True
        extra = pydantic_v1.Extra.allow
        json_encoders = {dt.datetime: serialize_datetime}


DebugVariableValue = typing.Union[
    DebugVariableValue_IntegerValue,
    DebugVariableValue_BooleanValue,
    DebugVariableValue_DoubleValue,
    DebugVariableValue_StringValue,
    DebugVariableValue_CharValue,
    DebugVariableValue_MapValue,
    DebugVariableValue_ListValue,
    DebugVariableValue_BinaryTreeNodeValue,
    DebugVariableValue_SinglyLinkedListNodeValue,
    DebugVariableValue_DoublyLinkedListNodeValue,
    DebugVariableValue_UndefinedValue,
    DebugVariableValue_NullValue,
    DebugVariableValue_GenericValue,
]
from .debug_key_value_pairs import DebugKeyValuePairs  # noqa: E402
from .debug_map_value import DebugMapValue  # noqa: E402

DebugVariableValue_ListValue.update_forward_refs(DebugKeyValuePairs=DebugKeyValuePairs)
