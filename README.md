Benchy
====

This is a small CLI tool for comparing performance metrics between web pages with Lighthouse.

# Installation

```
yarn global add benchy-cli
```

# Usage

## Audit

```bash
$ benchy audit https://website.com -c 10 -n website_A
```

Create a new audit named `n` and generate `c` lighthouse reports with the given URL.


## List

```bash
$ benchy list
```

List all audits

## Report

```bash
$ benchy report website_A website_B
```

Compare performance metrics.

```bash
┌─────────────┬────────────────┬────────────────┐
│             │ website_A      │ website_B      │
├─────────────┼────────────────┼────────────────┤
│ metric      │ 2859ms         │ 2264ms         │
│             ├────────┬───────┼────────┬───────┤
│             │ stdev  │ -     │ stdev  │ diff  |
└─────────────┴────────┴───────┴────────┴───────┘
```

## Clean

```bash
$ benchy clean
```

Delete all audits