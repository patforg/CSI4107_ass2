## BOW
Used StringToWordVector filter to transform the sentence feature to a vector of words.
Removed all other features.

### SMO Classifier
Used standard settings
Average Scores:
* Precision 0.459
* Recall 0.499
* F-Score 0.427

### J48 Classifier
Used standard settings
Average Scores:
* Precision 0.417
* Recall 0.455
* F-Score 0.425

### NaiveBayes Classifier
Used standard settings
Average Scores:
* Precision 0.422
* Recall 0.458
* F-Score 0.425

### DecisionTable Classifier
Used standard settings
Average Scores:
* Precision 0.419
* Recall 0.48
* F-Score 0.383

## MainFeatures

Features enabled were:
* CapitalizedWordCount
* urlPresent
* wellWritten
* exclamation
* maxDiffScore
* question
* negatingWords
* neutralityWords
* repeatingLetter
* smileyScore

### SMO Classifier
Used standard settings
Average Scores:
* Precision 0.315
* Recall 0.482
* F-Score 0.348

### J48 Classifier
Used standard settings
Average Scores:
* Precision 0.466
* Recall 0.499
* F-Score 0.475

### NaiveBayes Classifier
Used standard settings
Average Scores:
* Precision 0.502
* Recall 0.502
* F-Score 0.49

### DecisionTable Classifier
Used standard settings
Average Scores:
* Precision 0.505
* Recall 0.531
* F-Score 0.511

## BOW_w_features
Used StringToWordVector filter to transform the sentence feature to a vector of words.

Other features enabled were:
* CapitalizedWordCount
* urlPresent
* wellWritten
* exclamation
* maxDiffScore
* question
* negatingWords
* neutralityWords
* repeatingLetter
* smileyScore

### SMO Classifier
Used standard settings
Average Scores:
* Precision 0.508
* Recall 0.537
* F-Score 0.505

### J48 Classifier
Used standard settings
Average Scores:
* Precision 0.472
* Recall 0.492
* F-Score 0.479

### NaiveBayes Classifier
Used standard settings
Average Scores:
* Precision 0.509
* Recall 0.501
* F-Score 0.495

### DecisionTable Classifier
Used standard settings
Average Scores:
* Precision 0.507
* Recall 0.532
* F-Score 0.51

