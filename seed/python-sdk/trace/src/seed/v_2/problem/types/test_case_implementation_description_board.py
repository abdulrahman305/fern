# This file was auto-generated by Fern from our API Definition.

from __future__ import annotations

import typing

from ....core.pydantic_utilities import pydantic_v1
from .parameter_id import ParameterId


class TestCaseImplementationDescriptionBoard_Html(pydantic_v1.BaseModel):
    type: typing.Literal["html"] = "html"
    value: str

    class Config:
        frozen = True
        smart_union = True


class TestCaseImplementationDescriptionBoard_ParamId(pydantic_v1.BaseModel):
    type: typing.Literal["paramId"] = "paramId"
    value: ParameterId

    class Config:
        frozen = True
        smart_union = True


TestCaseImplementationDescriptionBoard = typing.Union[
    TestCaseImplementationDescriptionBoard_Html, TestCaseImplementationDescriptionBoard_ParamId
]
