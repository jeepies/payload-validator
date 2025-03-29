import int from "./datatypes/int";
import str from "./datatypes/str";

const validator = {
  int,
  str,
};

export default validator;

// TODO Figure out a way to dynamically create rules, instead of {src/datatypes/int.ts(71)}
// TODO Make code DRY by creating a Primitive Rule book that contains basics like EQUALS
// TODO Make code DRY by creating a _parse method that takes in data and a RuleBook
