<div align="center">
<h1><strong>benchy</strong></h1>

A small CLI tool for comparing performance metrics between web pages with Lighthouse.

![demo](./docs/demo.gif)

</div>

## Installation

```
yarn global add benchy-cli
```

## Commands

### Audit

```bash
$ benchy audit <urls...>
```

Launch lighthouse audits for `<urls...>` and show report in the terminal. Multiple URLs can be provided.

#### Options

- `-c [NUM]` - Number of audits per url. default: 1.
- `-d` - Output the Document Stats section.
- `-p` - Output the Page Metrics section.
- `-i` - Output the Interactive Metrics section.
- `-l` - Output the Layout Metrics section.
- `-t` - Output the Task section.

### List

```bash
$ benchy list
```

List all saved audits.

### Report

```bash
$ benchy report website_A website_B
```

Compare saved audits.

```bash
┌─────────────┬────────────────┬────────────────┐
│             │ website_A      │ website_B      │
├─────────────┼────────────────┼────────────────┤
│ metric      │ 2859ms         │ 2264ms         │
│             ├────────┬───────┼────────┬───────┤
│             │ stdev  │ -     │ stdev  │ diff  |
└─────────────┴────────┴───────┴────────┴───────┘
```

### Clean

```bash
$ benchy clean
```

Delete all audits.
